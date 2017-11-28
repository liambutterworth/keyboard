//
// App
//
// :: Constructor
// :: Mount Events
// :: Action Methods
// :: Toggle Mode
// :: Event Handlers
// :: Render
// :: Properties

import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';
import actions    from 'actions.json';

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

		this.actions = actions;

		this.handleKeydown = this.handleKeydown.bind( this );
		this.handleKeyup   = this.handleKeyup.bind( this );
		this.handleAction  = this.handleAction.bind( this );

		this.isActionRegex   = this.actionIsRegex();
		this.isInputRegex    = this.actionIsRegex( 'input' );
		this.isCommandRegex  = this.actionIsRegex( 'command' );
		this.isShortcutRegex = this.actionIsRegex( 'shortcut' );

	}

	//
	// Mount Events
	//

	componentWillMount() {

		document.addEventListener( 'keydown', this.handleKeydown );
		document.addEventListener( 'keyup', this.handleKeyup );
		document.addEventListener( 'action', this.handleAction );

	}

	componentWillUnmount() {

		document.removeEventListener( 'keydown', this.handleKeydown );
		document.removeEventListener( 'keyup', this.handleKeyup );
		document.removeEventListener( 'action', this.handleAction );

	}

	//
	// Action Methods
	//

	actionIsRegex( type ) {

		const results = this.actions.filter( ( action ) => ( !type || action.type === type ) );
		const codes   = results.map( ( action ) => ( action.code ) );

		return new RegExp( `^(${ codes.join( '|' ) })$` );

	}

	isAction( code, type ) {

		let passed;

		switch ( type ) {

			case 'input':
				passed = this.isInputRegex.test( code );
				break;

			case 'command':
				passed = this.isCommandRegex.test( code );
				break;

			case 'shortcut':
				passed = this.isShortcutRegex.test( code );
				break;

			default:
				passed = this.isActionRegex.test( code );
				break;

		}

		return passed;

	}

	getAction( code, type, options ) {
		
		const action = this.actions.find( ( action ) => {

			return action.code === code && ( !type || action.type === type );

		} );

		return Object.assign( action, options || {} );

	}

	dispatchAction( action ) {

		const customEvent = new CustomEvent( 'action', { detail: action } );
		document.dispatchEvent( customEvent );

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

	handleAction( event ) {

		switch ( event.detail.desc ) {

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

		let action;

		if ( this.state.mode === 'INPUT' && this.isAction( code, 'input' ) ) {

			action = this.getAction( code, 'input', { desc: 'play key' } );

		} else if ( this.state.mode === 'COMMAND' && this.isAction( code, 'command' ) ) {

			action = this.getAction( code, 'command' );

		} else if ( this.isAction( code, 'shortcut' ) ) {

			action = this.getAction( code, 'shortcut' );

		}

		if ( action ) this.dispatchAction( action );

	}

	handleKeyup( event ) {

		const code = event.which;

		if (
			event.metaKey ||
			this.state.mode !== 'INPUT' ||
			!this.isAction( code, 'input' )
		) return;

		event.preventDefault();
		const action = Object.assign( this.getAction( code, 'input' ), { desc: 'stop key' } );
		this.dispatchAction( action );

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
