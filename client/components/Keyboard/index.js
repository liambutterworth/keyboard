//
// Keyboard
//
// :: Constructor
// :: Mount Events
// :: ---
// :: Key Methods
// :: Event Handlers
// :: Render Methods
// :: Properties

import React         from 'react';
import PropTypes     from 'prop-types';
import ShortID       from 'shortid';
import MusicTheory   from 'music-theory';
import Prompt        from 'components/Prompt';
import Tabs, { Tab } from 'components/Tabs';
import ChordBuilder  from 'components/ChordBuilder';
import ScaleSelector from 'components/ScaleSelector';
import KeySelector   from 'components/KeySelector';
import actions       from 'actions.json';
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

		this.keys = [];

		this.handleAction = this.handleAction.bind( this );

		// TESTING
		// this.modifier = new MusicTheory.Key( 'C' );

	}

	//
	// Mount Events
	//

	componentWillMount() {

		this.context = new AudioContext();
		document.addEventListener( 'action', this.handleAction );

	}

	componentWillUnmount() {

		this.context.close();
		document.removeEventListener( 'action', this.handleAction );

	}

	//
	// Setters
	//

	setModifier( modifier ) {

		this.modifier = modifier;

	}

	setHighlight( highlight ) {

		const symbols = highlight.notes.symbols();

		this.keys.forEach( ( key ) => {

			const symbol = key.note.symbol();
			if ( symbols.includes( symbol ) ) key.highlight();

		} );

	}

	//
	// Key Methods
	//

	getKey( code ) {

		return this.keys.find( ( key ) => ( key.props.code === code ) );

	}

	getChordKeys( rootKey, chord ) {

		if ( !chord ) return [ rootKey ];

		return chord.intervals.map( ( interval ) => {

			const maxIndex    = this.keys.length - 1;
			const targetIndex = rootKey.props.index + interval.steps;

			let key;

			if ( targetIndex <= maxIndex ) {

				key = this.keys[targetIndex];

			} else {

				const invertedInverval = interval.invert();
				const invertedIndex    = rootKey.props.index - invertedInverval.steps;

				key = this.keys[invertedIndex];

			}

			return key;

		} );

	}

	getKeys( rootKey ) {

		let targetKeys;

		if ( this.modifier instanceof MusicTheory.Key ) {

			const chord = this.modifier.getChordFromNote( rootKey.note );
			targetKeys = this.getChordKeys( rootKey, chord );

		} else if ( this.modifier instanceof MusicTheory.Chord ) {

			targetKeys = this.getChordKeys( rootKey, this.modifier );

		} else {

			targetKeys = [ rootKey ];

		}

		return targetKeys;

	}

	playKey( key ) {

		if ( this.modifier ) {

			const keysToPlay = this.getKeys( key );
			keysToPlay.forEach( ( keyToPlay ) => ( keyToPlay.play() ) );

		} else {

			key.play();

		}


	}

	stopKey( key ) {

		if ( this.modifier ) {

			const keysToStop = this.getKeys( key );
			keysToStop.forEach( ( keyToStop ) => ( keyToStop.stop() ) );

		} else {

			key.stop();

		}

	}

	stopKeys() {

		this.keys.forEach( ( keyToStop ) => ( keyToStop.stop() ) );

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

		const inputs = actions.filter( ( actions ) => ( actions.type === 'input' ) );

		let octave = this.state.octave;

		return inputs.map( ( key, index ) => {

			const component = (
				<Key
					key={ ShortID.generate() }
					index={ index }
					code={ key.code }
					note={ key.note }
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
						<Tab title="Chord"><ChordBuilder submit={ this.setModifier } /></Tab>
						<Tab title="Key"><KeySelector submit={ this.setModifier } /></Tab>
					</Tabs>
				</Prompt>

				<Prompt ref={ ( self ) => ( this.highlightPrompt = self ) }>
					<Tabs>
						<Tab title="Chord"><ChordBuilder submit={ this.setHighlight } /></Tab>
						<Tab title="Key"><KeySelector submit={ this.setHighlight } /></Tab>
						<Tab title="Scale"><ScaleSelector submit={ this.setHighlight } /></Tab>
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
