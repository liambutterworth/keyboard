//
// Keyboard
//
// :: Constructor
// :: Component Will Mount
// :: Component Will Unmount
// :: Get Key
// :: Stop Keys
// :: Handle Shortcut
// :: Handle Command
// :: Handle Keydown
// :: Handle Keyup
// :: Render Keys
// :: Render
// :: Default Props
// :: Prop Types

import React      from 'react';
import PropTypes  from 'prop-types';
import ShortID    from 'shortid';
import Prompt     from 'components/Prompt';
import Keys       from 'keys.json';
import Key        from './Key';

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
	// Component Will Mount
	//

	componentWillMount() {

		this.context = new AudioContext();
		document.addEventListener( 'shortcut', this.handleShortcut );
		document.addEventListener( 'command', this.handleCommand );
		document.addEventListener( 'input', this.handleInput );

	}

	//
	// Component Will Unmount

	componentWillUnmount() {

		this.context.close();
		document.removeEventListener( 'shortcut', this.handleShortcut );
		document.removeEventListener( 'command', this.handleCommand );
		document.removeEventListener( 'key', this.handleKey );

	}

	//
	// Get Key
	//

	getKey( code ) {

		return this.keys.find( ( key ) => ( key.props.code === code ) );

	}


	//
	// Stop Keys
	//

	stopKeys() {

		this.keys.forEach( ( key ) => {

			if ( key.state.isPressed ) key.stop();

		} );

	}

	//
	// Hanlde Shortcut
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

	//
	// Handle Command
	//

	handleCommand( event ) {

		switch ( event.detail.action ) {

			case 'open prompt':
				this.prompt.toggle();
				break;

			case 'define key':
				console.log( 'define a key' );
				break;

		}

	}

	//
	// Handle Input
	//

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
	// Render Keys
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

	//
	// Render
	//

	render() {

		return (
			<div className="keyboard">
				<Prompt
					ref={ ( prompt ) => ( this.prompt = prompt ) }
				/>

				<div className="keyboard-keys">
					{ this.renderKeys() }
				</div>
			</div>
		);

	}

}

//
// Default Props
//

Keyboard.defaultProps = {
	octave: 4,
};

//
// Prop Types
//

Keyboard.propTypes = {
	octave: PropTypes.number,
};

export default Keyboard;
