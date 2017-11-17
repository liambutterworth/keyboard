import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';

require( './style.css' );

class App extends React.Component {
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

	componentWillMount() {
		document.addEventListener( 'keydown', this.handleKeydown );
	}

	componentWillUnmount() {
		document.removeEventListener( 'keydown', this.handleKeydown );
	}

	toggleMode() {
		if ( this.state.mode === 'INPUT' ) {
			this.setState( { mode: 'COMMAND' } );
		} else {
			this.setState( { mode: 'INPUT' } );
		}

		document.mode = this.state.mode;
	}

	isCommand( code ) {
		return this.commandRegex.test( code );
	}

	getCommand( code ) {
		return this.props.commands.find( ( command ) => ( command.code === code ) );
	}

	dispatchCommand( command ) {
		const event = new CustomEvent( 'command', {
			detail: command.detail,
		} );

		document.dispatchEvent( event );
	}

	isShortcut( code ) {
		return this.shortcutRegex.test( code );
	}

	getShortcut( code ) {
		return this.props.shortcuts.find( ( shortcut ) => ( shortcut.code === code ) );
	}

	dispatchShortcut( shortcut ) {
		const event = new CustomEvent( 'shortcut', {
			detail: shortcut.detail,
		} );

		document.dispatchEvent( event );
	}

	handleKeydown( event ) {

		// if the toggle key was pressed
		if ( event.which === this.props.toggle ) {

			this.toggleMode();

		// if a command key is pressed in command mode
		} else if ( this.state.mode === 'COMMAND' && this.isCommand( event.which ) ) {

			const command = this.getCommand( event.which );
			this.dispatchCommand( command );

		// if a shortcut key was pressed in any mode
		} else if ( this.isShortcut( event.which ) ) {

			const shortcut = this.getShortcut( event.which );
			this.dispatchShortcut( shortcut );

		}
	}

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
