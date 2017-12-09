//
// Keyboard
//
// :: Constructor
// :: Mount Events
// :: Key Methods
// :: Event Handlers
// :: Render Methods
// :: Properties

import React         from 'react';
import PropTypes     from 'prop-types';
import ShortID       from 'shortid';
import MusicTheory   from 'music-theory';
import Tone          from 'tone';
import Prompt        from 'components/Prompt';
import Tabs, { Tab } from 'components/Tabs';
import ChordSelector from 'components/ChordSelector';
import ScaleSelector from 'components/ScaleSelector';
import KeySelector   from 'components/KeySelector';
import Actions       from 'library/Actions';
import Key           from './Key';

require( './style.css' );

class Keyboard extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {

		super( props );

		this.state = {
			octave: props.octave,
		};

		this.keys         = [];
		this.fingerprints = [];
		this.synth        = new Tone.PolySynth().toMaster();

		this.handleAction = this.handleAction.bind( this );
		this.setHighlight = this.setHighlight.bind( this );
		this.setModifier  = this.setModifier.bind( this );

		// TODO remove
		this.modifier = new MusicTheory.Key( 'C' );

	}

	//
	// Mount Events
	//

	componentWillMount() {

		document.addEventListener( 'action', this.handleAction );

	}

	componentWillUnmount() {

		document.removeEventListener( 'action', this.handleAction );

	}

	//
	// Setters
	//

	setHighlight( highlight ) {

		const symbols = highlight.notes.symbols();

		this.keys.forEach( ( key ) => {

			const symbol = key.note.symbol();

			if ( symbols.includes( symbol ) ) {

				key.highlight();

			} else {

				key.unhighlight();

			}

		} );

	}

	setModifier( modifier ) {

		this.modifier = modifier;

	}

	//
	// Key Methods
	//

	getKey( code ) {

		return this.keys.find( ( key ) => ( key.props.code === code ) );

	}

	getChordKeys( root, chord ) {

		if ( !chord ) return [ root ];

		return chord.intervals.map( ( interval ) => {

			const maxIndex    = this.keys.length - 1;
			const targetIndex = root.props.index + interval.steps;

			let key;

			if ( targetIndex <= maxIndex ) {

				key = this.keys[targetIndex];

			} else {

				const invertedInverval = interval.invert();
				const invertedIndex    = root.props.index - invertedInverval.steps;

				key = this.keys[invertedIndex];

			}

			return key;

		} );

	}

	modifyKey( root ) {

		let chord;

		if ( this.modifier instanceof MusicTheory.Key ) {

			chord = this.modifier.getChordFromNote( root.note );

		} else if ( this.modifier instanceof MusicTheory.Chord ) {

			chord = this.modifier;

		}

		return this.getChordKeys( root, chord );

	}

	playKey( root ) {

		const keys    = this.modifier ? this.modifyKey( root ) : [ root ];
		const pitches = keys.map( ( key ) => ( key.pitch ) );

		// add a pitch fingerprint to the fingerprints cache; solves the
		// issue of keys being associated with multiple extended keys
		this.fingerprints.push( pitches.join( '' ) );

		// press each key in turn
		keys.forEach( ( key ) => ( key.press() ) );

		// trigger the key sounds with the Tone synth
		this.synth.triggerAttack( pitches );

	}

	stopKey( root ) {

		const keys    = this.modifier ? this.modifyKey( root ) : [ root ];
		const pitches = keys.map( ( key ) => ( key.pitch ) );

		// remove pitch fingerprint from the fingerprints cache
		this.fingerprints.splice( this.fingerprints.indexOf( pitches.join( '' ) ), 1 );

		// release each key in turn
		keys.forEach( ( key ) => {

			// find out if the pitch currently exists in the fingerprint cache
			const index = this.fingerprints.findIndex( ( fingerprint ) => {

				// run a regex test to see if the pitch exists in the fingerprint
				const regexPitch = new RegExp( key.pitch );
				return regexPitch.test( fingerprint );

			} );

			// pitch exists in the fingerprint cache
			if ( index > -1 ) {

				// remove pitch from array to be released
				pitches.splice( pitches.indexOf( key.pitch ), 1 );

			// pitch doesnt exist in the fingerprint cache
			} else {

				// indicate key has been released in the UI
				key.release();

			}

		} );

		// release all pitches that dont exist in the fingerprint cache
		this.synth.triggerRelease( pitches );

	}

	stopKeys() {

		this.keys.forEach( ( key ) => ( key.stop() ) );

	}

	//
	// Event Handlers
	//

	handleAction( event ) {

		switch ( event.detail.desc ) {

			case 'play key':
				this.playKey( this.getKey( event.detail.code ) );
				break;

			case 'stop key':
				this.stopKey( this.getKey( event.detail.code ) );
				break;

			case 'octave down':
				if ( this.state.octave === 1 ) return;
				this.stopKeys();
				this.setState( { octave: this.state.octave - 1 } );
				break;

			case 'octave up':
				if ( this.state.octave === 9 ) return;
				this.stopKeys();
				this.setState( { octave: this.state.octave + 1 } );
				break;

			case 'open prompt':
				this.prompt.toggle();
				break;

			case 'toggle modifier prompt':
				this.modifierPrompt.toggle();
				break;

			case 'toggle highlight prompt':
				this.highlightPrompt.toggle();
				break;

		}

	}

	//
	// Render Methods
	//

	renderKeys() {

		const inputs = Actions.all( 'input' );

		let octave = this.state.octave;

		return inputs.map( ( key, index ) => {

			const component = (
				<Key
					key={ ShortID.generate() }
					index={ index }
					code={ key.code }
					note={ key.note }
					synth={ this.synth }
					octave={ octave }
					context={ this.context }
					ref={ ( self ) => ( this.keys[index] = self ) }
				/>
			);

			// increment the index by one every twelve notes
			if ( ( index + 1 ) % 12 === 0 ) octave += 1;

			return component;

		} );

	}

	render() {

		return (
			<div className="keyboard">
				<div className="keyboard-keys">
					{ this.renderKeys() }
				</div>

				<Prompt ref={ ( self ) => ( this.modifierPrompt = self ) }>
					<Tabs>
						<Tab title="Chord"><ChordSelector set={ this.setModifier } defineRoot={ false } /></Tab>
						<Tab title="Key"><KeySelector set={ this.setModifier } /></Tab>
					</Tabs>
				</Prompt>

				<Prompt ref={ ( self ) => ( this.highlightPrompt = self ) }>
					<Tabs>
						<Tab title="Chord"><ChordSelector set={ this.setHighlight } /></Tab>
						<Tab title="Key"><KeySelector set={ this.setHighlight } /></Tab>
						<Tab title="Scale"><ScaleSelector set={ this.setHighlight } /></Tab>
					</Tabs>
				</Prompt>
			</div>
		);

	}

}

//
// Properties
//

Keyboard.defaultProps = {
	octave: 4,
};

Keyboard.propTypes = {
	octave: PropTypes.number,
};

export default Keyboard;
