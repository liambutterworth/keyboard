//
// App
//
// :: Constructor
// :: Component Will Mount
// :: Component Will Unmount
// :: Get Command
// :: Get Shortcut
// :: is Command
// :: Is Shortcut
// :: Dispatch Command
// :: Dispatch Shortcut
// :: Toggle Mode
// :: Handle Keydown
// :: Render
// :: Default Props
// :: Prop Types

import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';

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

		// set initial mode state on document
		document.mode = this.state.mode;

		// ensure event handlers have the correct "this" reference
		this.handleKeydown = this.handleKeydown.bind( this );

		// create regex to quickly test for commands and shortcuts
		this.commandCodes  = props.commands.map( ( command ) => ( command.code ) );
		this.commandRegex  = new RegExp( `^(${ this.commandCodes.join( '|' ) })$` );
		this.shortcutCodes = props.shortcuts.map( ( shortcut ) => ( shortcut.code ) );
		this.shortcutRegex = new RegExp( `^(${ this.shortcutCodes.join( '|' ) })$` );

	}

	//
	// Component Will Mount
	//

	componentWillMount() {

		document.addEventListener( 'keydown', this.handleKeydown );

	}

	//
	// Component Will Unmount
	//

	componentWillUnmount() {

		document.removeEventListener( 'keydown', this.handleKeydown );

	}

	//
	// Get Command
	//

	getCommand( code ) {

		return this.props.commands.find( ( command ) => ( command.code === code ) );

	}

	//
	// Get Shortcut
	//

	getShortcut( code ) {

		return this.props.shortcuts.find( ( shortcut ) => ( shortcut.code === code ) );

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
	// Dispatch Command
	//

	dispatchCommand( command ) {

		const event = new CustomEvent( 'command', { detail: command.detail } );
		document.dispatchEvent( event );

	}

	//
	// Dispatch Shortcut
	//

	dispatchShortcut( shortcut ) {

		const event = new CustomEvent( 'shortcut', { detail: shortcut.detail } );
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

		document.mode = this.state.mode;

	}

	//
	// Hanlde Keydown
	//

	handleKeydown( event ) {

		if ( event.which === this.props.toggle ) {

			this.toggleMode();

		} else if ( this.state.mode === 'COMMAND' && this.isCommand( event.which ) ) {

			const command = this.getCommand( event.which );
			this.dispatchCommand( command );

		} else if ( this.isShortcut( event.which ) ) {

			const shortcut = this.getShortcut( event.which );
			this.dispatchShortcut( shortcut );

		}

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

	commands: [
		{ code: 80, detail: 'open prompt' }, // p
		{ code: 75, detail: 'define key'  }, // k
	],

	shortcuts: [
		{ code: 188, detail: 'octave down' }, // ,
		{ code: 190, detail: 'octave up'   }, // .
	],
};

//
// Prop Types
//

App.propTypes = {
	children: PropTypes.node.isRequired,
	toggle:   PropTypes.number,

	commands: PropTypes.arrayOf(
		PropTypes.shape( {
			code:   PropTypes.number,
			detail: PropTypes.sting,
		} ),
	),

	shortcuts: PropTypes.arrayOf(
		PropTypes.shape( {
			code:   PropTypes.number,
			detail: PropTypes.sting,
		} ),
	),
};

export default App;
