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
import Prompt        from 'components/Prompt';
import ChordBuilder  from 'components/ChordBuilder';
import ScaleSelector from 'components/ScaleSelector';
import KeySelector   from 'components/KeySelector';
import Keys          from 'keys.json';
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

		// create a reference for all keyboard keys
		this.keys = [];

		// ensure event handlers have the correct "this" reference
		this.handleShortcut = this.handleShortcut.bind( this );
		this.handleCommand  = this.handleCommand.bind( this );
		this.handleInput    = this.handleInput.bind( this );

	}

	//
	// Mount Events
	//

	componentWillMount() {

		this.context = new AudioContext();
		document.addEventListener( 'shortcut', this.handleShortcut );
		document.addEventListener( 'command', this.handleCommand );
		document.addEventListener( 'input', this.handleInput );

		// Dispatcher.on( 'shortcut', this.handleShortcut );
		// Dispatcher.on( 'command', this.handleCommand );
		// Dispatcher.on( 'input', this.handleInput );

	}

	componentWillUnmount() {

		this.context.close();
		document.removeEventListener( 'shortcut', this.handleShortcut );
		document.removeEventListener( 'command', this.handleCommand );
		document.removeEventListener( 'key', this.handleKey );

	}

	//
	// Key Methods
	//

	getKey( code ) {

		return this.keys.find( ( key ) => ( key.props.code === code ) );

	}

	stopKeys() {

		this.keys.forEach( ( key ) => {

			if ( key.state.isPressed ) key.stop();

		} );

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

			case 'keydown':
				key.play();
				break;

			case 'keyup':
				if ( key.state.isPressed ) key.stop();
				break;

		}

	}

	//
	// Render Methods
	//

	renderKeys() {

		const keys = Keys.inputs;
		let octave = this.state.octave;

		return keys.map( ( key, index ) => {

			const component = (
				<Key
					key={ ShortID.generate() }
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
