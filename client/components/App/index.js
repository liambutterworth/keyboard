//
// App
//
// :: Constructor
// :: Component Will Mount
// :: Component Will Unmount
// :: Get Input
// :: Get Command
// :: Get Shortcut
// :: Is Key
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
import Keys       from 'keys.json';

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

		const testRegex = ( entries ) => {
			const codes = entries.map( ( entry ) => ( entry.code ) );
			return new RegExp( `^(${ codes.join( '|' ) })$` );
		};

		this.keyRegex      = testRegex( Keys.inputs.concat( Keys.commands, Keys.shortcuts ) );
		this.inputRegex    = testRegex( Keys.inputs );
		this.commandRegex  = testRegex( Keys.commands );
		this.shortcutRegex = testRegex( Keys.shortcuts );

		this.handleKeydown = this.handleKeydown.bind( this );
		this.handleKeyup   = this.handleKeyup.bind( this );

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

		return Keys.inputs.find( ( input ) => ( input.code === code ) );

	}

	//
	// Get Command
	//

	getCommand( code ) {

		return Keys.commands.find( ( command ) => ( command.code === code ) );

	}

	//
	// Get Shortcut
	//

	getShortcut( code ) {

		return Keys.shortcuts.find( ( shortcut ) => ( shortcut.code === code ) );

	}

	//
	// Is Key
	//

	isKey( code ) {

		return this.keyRegex.test( code );

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

		const code = event.which;
		if ( event.metaKey || !this.isKey( code ) ) return;
		event.preventDefault();
		if ( event.repeat ) return;

		if ( code === this.props.toggle ) {

			this.toggleMode();

		} else if ( this.state.mode === 'INPUT' && this.isInput( code ) ) {

			const input = this.getInput( code );
			input.action = 'keydown';
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
