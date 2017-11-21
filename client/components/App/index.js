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
import Dispatcher from 'library/Dispatcher';
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

		this.dispatcher = new Dispatcher();

		const testRegex = ( entries ) => {
			const codes = entries.map( ( entry ) => ( entry.code ) );
			return new RegExp( `^(${ codes.join( '|' ) })$` );
		};

		this.inputRegex    = testRegex( Keys.inputs );
		this.commandRegex  = testRegex( Keys.commands );
		this.shortcutRegex = testRegex( Keys.shortcuts );

		this.handleKeydown = this.handleKeydown.bind( this );
		this.handleKeyup   = this.handleKeyup.bind( this );

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

		return Keys.inputs.find( ( input ) => ( input.code === code ) );

	}

	getCommand( code ) {

		return Keys.commands.find( ( command ) => ( command.code === code ) );

	}

	getShortcut( code ) {

		return Keys.shortcuts.find( ( shortcut ) => ( shortcut.code === code ) );

	}

	//
	// Is Methods
	//

	isInput( code ) {

		return this.inputRegex.test( code );

	}

	isCommand( code ) {

		return this.commandRegex.test( code );

	}

	isShortcut( code ) {

		return this.shortcutRegex.test( code );

	}

	//
	// Dispatch Methods
	//

	dispatchInput( input ) {

		const event = new CustomEvent( 'input', { detail: input } );
		document.dispatchEvent( event );

	}

	dispatchCommand( command ) {

		const event = new CustomEvent( 'command', { detail: command } );
		document.dispatchEvent( event );

	}

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
	// Event Handlers
	//

	handleKeydown( event ) {

		if ( event.metaKey ) return;
		event.preventDefault();

		const code = event.which;

		if ( code === this.props.toggle ) {

			this.toggleMode();

		} else if ( this.state.mode === 'INPUT' && this.isInput( code ) ) {

			if ( event.repeat ) return;
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
// Properties
//

App.defaultProps = {
	toggle: 32, // space
};

App.propTypes = {
	children: PropTypes.node.isRequired,
	toggle:   PropTypes.number,
};

export default App;
