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

import Form, {
	Button,
	Checkboxes,
	Checkbox,
	Radios,
	Radio,
	Select,
	Slider,
	Knob,
} from 'components/Form';

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

		this.fingerprints = [];
		this.keys         = [];
		this.synth        = new Tone.PolySynth().toMaster();

		this.handleAction = this.handleAction.bind( this );
		this.setHighlight = this.setHighlight.bind( this );
		this.setModifier  = this.setModifier.bind( this );

		Actions.add( [
			{ type: 'shortcut', char: ',', code: 188, desc: 'octave down' },
			{ type: 'shortcut', char: '.', code: 190, desc: 'octave up' },
			{ type: 'command', char: 'm', code: 77, desc: 'toggle modifier prompt' },
			{ type: 'command', char: 'h', code: 72, desc: 'toggle highlight prompt' },

			{ type: 'input', char: 'z', code: 90, note: 'C', desc: 'toggle key' },
			{ type: 'input', char: 's', code: 83, note: 'Db', desc: 'toggle key' },
			{ type: 'input', char: 'x', code: 88, note: 'D', desc: 'toggle key' },
			{ type: 'input', char: 'd', code: 68, note: 'Eb', desc: 'toggle key' },
			{ type: 'input', char: 'c', code: 67, note: 'E', desc: 'toggle key' },
			{ type: 'input', char: 'v', code: 86, note: 'F', desc: 'toggle key' },
			{ type: 'input', char: 'g', code: 71, note: 'Gb', desc: 'toggle key' },
			{ type: 'input', char: 'b', code: 66, note: 'G', desc: 'toggle key' },
			{ type: 'input', char: 'h', code: 72, note: 'Ab', desc: 'toggle key' },
			{ type: 'input', char: 'n', code: 78, note: 'A', desc: 'toggle key' },
			{ type: 'input', char: 'j', code: 74, note: 'Bb', desc: 'toggle key' },
			{ type: 'input', char: 'm', code: 77, note: 'B', desc: 'toggle key' },
			{ type: 'input', char: 'q', code: 81, note: 'C', desc: 'toggle key' },
			{ type: 'input', char: '2', code: 50, note: 'Db', desc: 'toggle key' },
			{ type: 'input', char: 'w', code: 87, note: 'D', desc: 'toggle key' },
			{ type: 'input', char: '3', code: 51, note: 'Eb', desc: 'toggle key' },
			{ type: 'input', char: 'e', code: 69, note: 'E', desc: 'toggle key' },
			{ type: 'input', char: 'r', code: 82, note: 'F', desc: 'toggle key' },
			{ type: 'input', char: '5', code: 53, note: 'Gb', desc: 'toggle key' },
			{ type: 'input', char: 't', code: 84, note: 'G', desc: 'toggle key' },
			{ type: 'input', char: '6', code: 54, note: 'Ab', desc: 'toggle key' },
			{ type: 'input', char: 'y', code: 89, note: 'A', desc: 'toggle key' },
			{ type: 'input', char: '7', code: 55, note: 'Bb', desc: 'toggle key' },
			{ type: 'input', char: 'u', code: 85, note: 'B', desc: 'toggle key' },
			{ type: 'input', char: 'i', code: 73, note: 'C', desc: 'toggle key' },
			{ type: 'input', char: '9', code: 57, note: 'Db', desc: 'toggle key' },
			{ type: 'input', char: 'o', code: 79, note: 'D', desc: 'toggle key' },
			{ type: 'input', char: '0', code: 48, note: 'Eb', desc: 'toggle key' },
			{ type: 'input', char: 'p', code: 80, note: 'E', desc: 'toggle key' },

			// { type: 'input', char: '\t', code: 9, note: 'C', desc: 'toggle key' },
			// { type: 'input', char: 'i', code: 49, note: 'Db', desc: 'toggle key' },
			// { type: 'input', char: 'q', code: 81, note: 'D', desc: 'toggle key' },
			// { type: 'input', char: '2', code: 50, note: 'Eb', desc: 'toggle key' },
			// { type: 'input', char: 'w', code: 87, note: 'E', desc: 'toggle key' },
			// { type: 'input', char: 'e', code: 69, note: 'F', desc: 'toggle key' },
			// { type: 'input', char: '4', code: 52, note: 'Gb', desc: 'toggle key' },
			// { type: 'input', char: 'r', code: 82, note: 'G', desc: 'toggle key' },
			// { type: 'input', char: '5', code: 53, note: 'Ab', desc: 'toggle key' },
			// { type: 'input', char: 't', code: 84, note: 'A', desc: 'toggle key' },
			// { type: 'input', char: '6', code: 54, note: 'Bb', desc: 'toggle key' },
			// { type: 'input', char: 'y', code: 89, note: 'B', desc: 'toggle key' },
			// { type: 'input', char: 'u', code: 85, note: 'C', desc: 'toggle key' },
			// { type: 'input', char: '8', code: 56, note: 'Db', desc: 'toggle key' },
			// { type: 'input', char: 'i', code: 73, note: 'D', desc: 'toggle key' },
			// { type: 'input', char: '9', code: 57, note: 'Eb', desc: 'toggle key' },
			// { type: 'input', char: 'o', code: 79, note: 'E', desc: 'toggle key' },
			// { type: 'input', char: 'p', code: 80, note: 'F', desc: 'toggle key' },
			// { type: 'input', char: '-', code: 189, note: 'Gb', desc: 'toggle key' },
			// { type: 'input', char: '[', code: 219, note: 'G', desc: 'toggle key' },
			// { type: 'input', char: '=', code: 187, note: 'Ab', desc: 'toggle key' },
			// { type: 'input', char: ']', code: 221, note: 'A', desc: 'toggle key' },
			// { type: 'input', char: '\b', code: 8, note: 'Bb', desc: 'toggle key' },
			// { type: 'input', char: '\\', code: 220, note: 'B', desc: 'toggle key' },
			// { type: 'input', char: '\r', code: 13, note: 'C', desc: 'toggle key' },
		] );

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
			if ( symbols.includes( symbol ) ) key.highlight(); else key.unhighlight();

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

		// trigger the synth playback
		this.synth.triggerAttack( pitches );

	}

	stopKey( root ) {

		const keys    = this.modifier ? this.modifyKey( root ) : [ root ];
		const pitches = keys.map( ( key ) => ( key.pitch ) );

		// remove pitch fingerprint from the fingerprints cache
		this.fingerprints.splice( this.fingerprints.indexOf( pitches.join( '' ) ), 1 );

		// release each key in turn
		keys.forEach( ( key ) => {

			// find out if the pitch currently exists in another extended key
			const index = this.fingerprints.findIndex( ( fingerprint ) => ( new RegExp( key.pitch ).test( fingerprint ) ) );

			// pitch exists in another extended key
			if ( index > -1 ) {

				// remove pitch from array to be released
				pitches.splice( pitches.indexOf( key.pitch ), 1 );

			} else {

				// relase the key
				key.release();

			}

		} );

		// stop all pitches that dont exist in the fingerprint cache
		this.synth.triggerRelease( pitches );

	}

	stopKeys() {

		const pitches = [];

		this.keys.forEach( ( key ) => {

			if ( key.state.isPressed ) {

				key.release();
				pitches.push( key.pitch );

			}

		} );

		this.synth.triggerRelease( pitches );
		this.fingerprints = [];

	}

	//
	// Event Handlers
	//

	handleAction( event ) {

		switch ( event.detail.desc ) {

			case 'toggle key':
				if ( event.detail.delegator === 'keydown' ) {

					this.playKey( this.getKey( event.detail.code ) );

				} else if ( event.detail.delegator === 'keyup' ) {

					this.stopKey( this.getKey( event.detail.code ) );

				}
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
				<Button text="Foobar" />

				<Slider />

				<Select name="foo" options={ [
					{ label: 'foobar', value: 'foo' },
					{ label: 'barbaz', value: 'bar' },
					{ label: 'bazfoo', value: 'baz' },
				] } />

				<Radios name="radio-test" data={ [
					{ label: 'Radio Test 1', value: '1' },
					{ label: 'Radio Test 2', value: '2' },
					{ label: 'Radio Test 3', value: '3' },
				] } />

				<Checkboxes name="checkbox-test" data={ [
					{ name: 'checkbox-test-1', label: 'Checkbox Test 1', value: '1' },
					{ name: 'checkbox-test-2', label: 'Checkbox Test 2', value: '2' },
					{ name: 'checkbox-test-3', label: 'Checkbox Test 3', value: '3' },
				] } />

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
