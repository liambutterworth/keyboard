//
// Keyboard
//
// :: Constructor
// :: Mount Methods
// :: Toggle Mode
// :: Key Methods
// :: Command Methods
// :: Shortcut Methods
// :: Event Handlers
// :: Render Methods
// :: Default Props
// :: Prop Types

import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';
import ShortID    from 'shortid';
import Key        from './Key';
import Prompt     from './Prompt';

require( './style.css' );

class Keyboard extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );

		this.state = {
			mode:   props.mode,
			octave: props.octave,
		}

		// create a reference for all keyboard keys
		this.keys = [];

		// ensure that event handlers always refer to this componen with "this"
		this.handleKeydown = this.handleKeydown.bind( this );
		this.handleKeyup   = this.handleKeyup.bind( this );

		// create regex to quickly and efficiently test for keys, commands and shortcuts
		this.keyCodes      = props.keys.map( ( key ) => ( key.code ) );
		this.keyRegex      = new RegExp( `^(${ this.keyCodes.join( '|' ) })$` );
		this.commandCodes  = props.commands.map( ( command ) => ( command.code ) );
		this.commandRegex  = new RegExp( `^(${ this.commandCodes.join( '|' ) })$` );
		this.shortcutCodes = props.shortcuts.map( ( shortcut ) => ( shortcut.code ) );
		this.shortcutRegex = new RegExp( `^(${ this.shortcutCodes.join( '|' ) })$` );
	}

	//
	// Mount Methods
	//

	componentWillMount() {
		this.context = new AudioContext();

		// bind event listeners when mounting
		document.addEventListener( 'keydown', this.handleKeydown );
		document.addEventListener( 'keyup',   this.handleKeyup );
	}

	componentWillUnmount() {
		this.context.close();

		// unbind event listeners when unmounting
		document.removeEventListener( 'keydown', this.handleKeydown );
		document.removeEventListener( 'keyup',   this.handleKeyup );
	}

	//
	// Toggle Mode
	//

	toggleMode() {
		if ( this.state.mode === 'INPUT' ) {
			this.setState( { mode: 'COMMAND' } );
		} else {
			this.setState( { mode: 'INPUT' } );
		}
	}

	//
	// Key Methods
	//

	isKey( code ) {
		return this.keyRegex.test( code );
	}

	getKey( code ) {
		return this.keys.find( ( key ) => ( key.props.code === code ) );
	}

	playKey( key ) {
		key.play();
	}

	stopKey( key ) {
		key.stop();
	}

	stopAllKeys() {
		this.keys.forEach( ( key ) => {
			if ( key.state.isPressed ) key.stop();
		} );
	}

	//
	// Command Methods
	//

	isCommand( code ) {
		return this.commandRegex.test( code );
	}

	getCommand( code ) {
		return this.props.commands.find( ( command ) => ( command.code === code ) );
	}

	enterCommand( command ) {
		switch ( command.action ) {
			case 'open prompt':
				this.prompt.toggle();
				break;

			case 'define key':
				console.log( 'define a key' )
				break;
		}
	}

	//
	// Shortcut Methods
	//

	isShortcut( code ) {
		return this.shortcutRegex.test( code );
	}

	getShortcut( code ) {
		return this.props.shortcuts.find( ( shortcut ) => ( shortcut.code === code ) );
	}

	enterShortcut( shortcut ) {
		switch ( shortcut.action ) {
			case 'octave down':
				if ( this.state.octave === 1 ) return;
				this.stopAllKeys();
				this.setState( { octave: this.state.octave - 1 } );
				break;

			case 'octave up':
				if ( this.state.octave === 9 ) return;
				this.stopAllKeys();
				this.setState( { octave: this.state.octave + 1 } );
				break;
		}
	}

	//
	// Event Handlers
	//

	handleKeydown( event ) {

		// dont hijack application shortcuts
		if ( event.metaKey ) return;

		// if this is the mode toggle key command
		if ( event.keyCode === this.props.toggle ) {

			this.toggleMode();

		// if in input mode and the keycode is for a keyboard key
		} else if ( this.state.mode === 'INPUT' && this.isKey( event.which ) ) {

			const key = this.getKey( event.which );
			event.preventDefault();
			if ( event.repeat ) return;
			this.playKey( key );

		// if in command mode and the keycode is for a command
		} else if ( this.state.mode === 'COMMAND' && this.isCommand( event.which ) ) {

			const command = this.getCommand( event.which );
			this.enterCommand( command );

		// if the keycode is for a shortcut; mode is irrelevant
		} else if ( this.isShortcut( event.which ) ) {

			const shortcut = this.getShortcut( event.which );
			this.enterShortcut( shortcut );

		}
	}

	handleKeyup( event ) {

		// dont hijack application shortcuts and ignore the mode toggle key
		if ( event.metaKey || event.keyCode === this.props.toggle ) return;

		// keyup only needed to stop keys from playing notes when released
		if ( this.state.mode === 'INPUT' ) {
			const key = this.getKey( event.which );

			if ( key && key.state.isPressed ) {
				event.preventDefault();
				this.stopKey( key );
			}
		}
	}

	//
	// Render Methods
	//

	renderKeys() {
		let octave = this.state.octave;

		return this.props.keys.map( ( key, index ) => {
			const component = (
				<Key
					key={ ShortID.generate() }
					code={ key.code }
					note={ key.note }
					octave={ octave }
					context={ this.context }
					ref={ ( key ) => ( this.keys[index] = key ) }
				/>
			);

			// increment the index by one every twelve notes
			if ( ( index + 1 ) % 12 === 0 ) octave += 1;

			return component;
		} );
	}

	render() {
		const classNames = ClassNames( {
			'keyboard':          true,
			'keyboard--input':   this.state.mode === 'INPUT',
			'keyboard--command': this.state.mode === 'COMMAND',
		} );

		return (
			<div className={ classNames }>
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
	mode:   'INPUT',
	octave: 4,
	toggle: 32, // space

	keys: [
		{ code: 9,   note: 'C'  }, // tab
		{ code: 49,  note: 'Db' }, // 1
		{ code: 81,  note: 'D'  }, // q
		{ code: 50,  note: 'Eb' }, // 2
		{ code: 87,  note: 'E'  }, // w
		{ code: 69,  note: 'F'  }, // e
		{ code: 52,  note: 'Gb' }, // 4
		{ code: 82,  note: 'G'  }, // r
		{ code: 53,  note: 'Ab' }, // 5
		{ code: 84,  note: 'A'  }, // t
		{ code: 54,  note: 'Bb' }, // 6
		{ code: 89,  note: 'B'  }, // y
		{ code: 85,  note: 'C'  }, // u
		{ code: 56,  note: 'Db' }, // 8
		{ code: 73,  note: 'D'  }, // i
		{ code: 57,  note: 'Eb' }, // 9
		{ code: 79,  note: 'E'  }, // o
		{ code: 80,  note: 'F'  }, // p
		{ code: 189, note: 'Gb' }, // -
		{ code: 219, note: 'G'  }, // [
		{ code: 187, note: 'Ab' }, // =
		{ code: 221, note: 'A'  }, // ]
		{ code: 8,   note: 'Bb' }, // delete
		{ code: 220, note: 'B'  }, // \
		{ code: 13,  note: 'C'  }, // enter
	],

	shortcuts: [ 
		{ code: 188, action: 'octave down' }, // ,
		{ code: 190, action: 'octave up'   }, // .
	],

	commands: [
		{ code: 80, action: 'open prompt' }, // p
		{ code: 75, action: 'define key'  }, // k
	],
};

//
// Prop Types
//

Keyboard.propTypes = {
	mode:   PropTypes.string,
	octave: PropTypes.number,
	toggle: PropTypes.number,

	inputs: PropTypes.arrayOf(
		PropTypes.shape( {
			code: PropTypes.number,
			note: PropTypes.sting,
		} )
	),
};

export default Keyboard;
