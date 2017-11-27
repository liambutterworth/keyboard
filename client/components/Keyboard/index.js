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
import ChordBuilder  from 'components/ChordBuilder';
import ScaleSelector from 'components/ScaleSelector';
import KeySelector   from 'components/KeySelector';
import keys          from 'keys.json';
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

		this.handleShortcut = this.handleShortcut.bind( this );
		this.handleCommand  = this.handleCommand.bind( this );
		this.handleInput    = this.handleInput.bind( this );

		// TESTING
		this.modifier = new MusicTheory.Key( 'C' );

	}

	//
	// Mount Events
	//

	componentWillMount() {

		this.context = new AudioContext();
		document.addEventListener( 'shortcut', this.handleShortcut );
		document.addEventListener( 'command', this.handleCommand );
		document.addEventListener( 'input', this.handleInput );

	}

	componentDidMount() {

		const musicalObject = new MusicTheory.Chord( 'Cmaj' );
		this.highlightKeys( musicalObject );

	}

	componentWillUnmount() {

		this.context.close();
		document.removeEventListener( 'shortcut', this.handleShortcut );
		document.removeEventListener( 'command', this.handleCommand );
		document.removeEventListener( 'key', this.handleKey );

	}

	//
	// ---
	//

	setModifier( modifier ) {

		this.modifier = modifier;

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

	highlightKeys( musicTheoryObject ) {

		const symbols = musicTheoryObject.notes.symbols();

		this.keys.forEach( ( key ) => {

			const symbol = key.note.symbol();
			if ( symbols.includes( symbol ) ) key.highlight();

		} );

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

	handleShortcut( event ) {

		switch ( event.detail.action ) {

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

		}

	}

	handleCommand( event ) {

		switch ( event.detail.action ) {

			case 'open prompt':
				this.prompt.toggle();
				break;

			case 'toggle chord builder':
				this.chordBuilder.prompt.toggle();
				break;

			case 'toggle scale selector':
				this.scaleSelector.prompt.toggle();
				break;

			case 'toggle key selector':
				this.keySelector.prompt.toggle();
				break;

		}

	}

	handleInput( event ) {

		const key = this.getKey( event.detail.code );

		switch ( event.detail.action ) {

			case 'play key':
				this.playKey( key );
				break;

			case 'stop key':
				this.stopKey( key );
				break;

		}

	}

	//
	// Render Methods
	//

	renderKeys() {

		const inputs = keys.filter( ( key ) => ( key.type === 'input' ) );

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

				<ChordBuilder
					set={ this.setChord }
					ref={ ( chordBuilder ) => ( this.chordBuilder = chordBuilder ) }
				/>

				<ScaleSelector
					set={ this.setKey }
					ref={ ( scaleSelector ) => ( this.scaleSelector = scaleSelector ) }
				/>

				<KeySelector
					set={ this.setKey }
					ref={ ( keySelector ) => ( this.keySelector = keySelector ) }
				/>
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
