//
// App
//
// :: Constructor
// :: Component Will Mount
// :: Component Will Unmount
// :: Get Input
// :: Get Command
// :: Get Shortcut
// :: Is Input
// :: is Command
// :: Is Shortcut
// :: Dispatch Input
// :: Dispatch Command
// :: Dispatch Shortcut
// :: Toggle Mode
// :: Handle Keydown
// :: Handle Keyup
// :: Render
// :: Default Props
// :: Prop Types

import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';
import Settings   from 'settings.json';

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

		// ensure event handlers have the correct "this" reference
		this.handleKeydown = this.handleKeydown.bind( this );
		this.handleKeyup   = this.handleKeyup.bind( this );

		// create regex to quickly test for commands and shortcuts
		this.inputCodes    = Settings.inputs.map( ( input ) => ( input.code ) );
		this.inputRegex    = new RegExp( `^(${ this.inputCodes.join( '|' ) })$` );
		this.commandCodes  = Settings.commands.map( ( command ) => ( command.code ) );
		this.commandRegex  = new RegExp( `^(${ this.commandCodes.join( '|' ) })$` );
		this.shortcutCodes = Settings.shortcuts.map( ( shortcut ) => ( shortcut.code ) );
		this.shortcutRegex = new RegExp( `^(${ this.shortcutCodes.join( '|' ) })$` );

	}

	//
	// Component Will Mount
	//

	componentWillMount() {

		document.addEventListener( 'keydown', this.handleKeydown );
		document.addEventListener( 'keyup', this.handleKeyup );

	}

	//
	// Component Will Unmount
	//

	componentWillUnmount() {

		document.removeEventListener( 'keydown', this.handleKeydown );
		document.removeEventListener( 'keyup', this.handleKeyup );

	}

	//
	// Get Input
	//

	getInput( code ) {

		return Settings.inputs.find( ( input ) => ( input.code === code ) );

	}

	//
	// Get Command
	//

	getCommand( code ) {

		return Settings.commands.find( ( command ) => ( command.code === code ) );

	}

	//
	// Get Shortcut
	//

	getShortcut( code ) {

		return Settings.shortcuts.find( ( shortcut ) => ( shortcut.code === code ) );

	}

	//
	// Is Input
	//

	isInput( code ) {

		return this.inputRegex.test( code );

	}

	//
	// Is Command
	//

	isCommand( code ) {

		return this.commandRegex.test( code );

	}

	//
	// Is Shortcut
	//

	isShortcut( code ) {

		return this.shortcutRegex.test( code );

	}

	//
	// Dispatch Input
	//

	dispatchInput( input ) {

		const event = new CustomEvent( 'input', { detail: input } );
		document.dispatchEvent( event );

	}

	//
	// Dispatch Command
	//

	dispatchCommand( command ) {

		const event = new CustomEvent( 'command', { detail: command } );
		document.dispatchEvent( event );

	}

	//
	// Dispatch Shortcut
	//

	dispatchShortcut( shortcut ) {

		const event = new CustomEvent( 'shortcut', { detail: shortcut } );
		document.dispatchEvent( event );

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
	// Hanlde Keydown
	//

	handleKeydown( event ) {

		if ( event.metaKey ) return;

		event.preventDefault();

		if ( event.which === this.props.toggle ) {

			this.toggleMode();

		} else if ( this.state.mode === 'INPUT' && this.isInput( event.which ) ) {

			const input = this.getInput( event.which );
			input.action = 'keydown';
			this.dispatchInput( input );

		} else if ( this.state.mode === 'COMMAND' && this.isCommand( event.which ) ) {

			const command = this.getCommand( event.which );
			this.dispatchCommand( command );

		} else if ( this.isShortcut( event.which ) ) {

			const shortcut = this.getShortcut( event.which );
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
		input.action = 'keyup';
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
// Default Props
//

App.defaultProps = {
	toggle: 32, // space
};

//
// Prop Types
//

App.propTypes = {
	children: PropTypes.node.isRequired,
	toggle:   PropTypes.number,
};

export default App;
