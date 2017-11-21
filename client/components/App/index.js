//
// App
//
// :: Constructor
// :: Mount Events
// :: Get Methods
// :: Is Methods
// :: Dispatch Methods
// :: Toggle Mode
// :: Event Handlers
// :: Render
// :: Properties

import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';
import keys       from 'keys.json';

require( './style.css' );

class App extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {

		super( props );

		this.state = {
			mode: 'INPUT',
		};

		this.eventTarget = document;

		this.handleCommand = this.handleCommand.bind( this );
		this.handleKeydown = this.handleKeydown.bind( this );
		this.handleKeyup   = this.handleKeyup.bind( this );

		this.keys         = keys;
		this.inputKeys    = this.keys.filter( ( key ) => ( key.type === 'input' ) );
		this.commandKeys  = this.keys.filter( ( key ) => ( key.type === 'command' ) );
		this.shortcutKeys = this.keys.filter( ( key ) => ( key.type === 'shortcut' ) );

		this.isKeyRegex      = this.createIsRegex();
		this.isInputRegex    = this.createIsRegex( 'input' );
		this.isCommandRegex  = this.createIsRegex( 'command' );
		this.isShortcutRegex = this.createIsRegex( 'shortcut' );

	}

	//
	// Mount Events
	//

	componentWillMount() {

		document.addEventListener( 'keydown', this.handleKeydown );
		document.addEventListener( 'keyup', this.handleKeyup );

	}

	componentWillUnmount() {

		document.removeEventListener( 'keydown', this.handleKeydown );
		document.removeEventListener( 'keyup', this.handleKeyup );

	}

	//
	// Get Methods
	//

	getInput( code ) {

		return this.inputKeys.find( ( input ) => ( input.code === code ) );

	}

	getCommand( code ) {

		return this.commandKeys.find( ( command ) => ( command.code === code ) );

	}

	getShortcut( code ) {

		return this.shortcutKeys.find( ( shortcut ) => ( shortcut.code === code ) );

	}

	//
	// Is Methods
	//

	createIsRegex( type ) {

		const filteredKeys = this.keys.filter( ( key ) => ( !type || key.type === type ) );
		const keyCodes     = filteredKeys.map( ( key ) => ( key.code ) );
		return new RegExp( `^(${ keyCodes.join( '|' ) })$` );

	}

	isKey( code ) {

		return this.isKeyRegex.test( code );

	}

	isInput( code ) {

		return this.isInputRegex.test( code );

	}

	isCommand( code ) {

		return this.isCommandRegex.test( code );

	}

	isShortcut( code ) {

		return this.isShortcutRegex.test( code );

	}

	//
	// Dispatch Methods
	//

	dispatchInput( input ) {

		const event = new CustomEvent( 'input', { detail: input } );
		this.eventTarget.dispatchEvent( event );

	}

	dispatchCommand( command ) {

		const event = new CustomEvent( 'command', { detail: command } );
		this.eventTarget.dispatchEvent( event );

	}

	dispatchShortcut( shortcut ) {

		const event = new CustomEvent( 'shortcut', { detail: shortcut } );
		this.eventTarget.dispatchEvent( event );

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
	// Event Handlers
	//

	handleCommand( event ) {

		switch ( event.detail.action ) {

			case 'toggle mode':
				this.toggleMode();
				break;

		}
	}

	handleKeydown( event ) {

		if ( event.metaKey ) return;
		event.preventDefault();
		if ( event.repeat ) return;

		const code = event.which;

		if ( this.state.mode === 'INPUT' && this.isInput( code ) ) {

			const input = this.getInput( code );
			input.action = 'play key';
			this.dispatchInput( input );

		} else if ( this.state.mode === 'COMMAND' && this.isCommand( code ) ) {

			const command = this.getCommand( code );
			this.dispatchCommand( command );

		} else if ( this.isShortcut( code ) ) {

			const shortcut = this.getShortcut( code );
			this.dispatchShortcut( shortcut );

		}

	}

	handleKeyup( event ) {

		if (
			event.metaKey ||
			this.state.mode !== 'INPUT' ||
			!this.isInput( event.which )
		) return;

		event.preventDefault();
		const input = this.getInput( event.which );
		input.action = 'stop key';
		this.dispatchInput( input );

	}

	//
	// Render
	//

	render() {

		const classNames = ClassNames( {
			'input-mode':   this.state.mode === 'INPUT',
			'command-mode': this.state.mode === 'COMMAND',
		} );

		return (
			<div id="app" className={ classNames }>
				{ this.props.children }
			</div>
		);

	}

}

//
// Properties
//

App.propTypes = {
	children: PropTypes.node.isRequired,
};

export default App;
