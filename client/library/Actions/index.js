//
// Actions
//
// :: All
// :: Create Is Regex
// :: Constructor
// :: Is
// :: Get
// :: Dispatch

import data from './data.json';

class Actions {

	//
	// All
	//

	static all( type ) {

		return data.filter( ( action ) => ( !type || action.type === type ) );

	}

	//
	// Create Is Regex
	//

	_createIsRegex( type ) {

		const results = data.filter( ( action ) => ( !type || action.type === type ) );
		const codes   = results.map( ( action ) => ( action.code ) );

		return new RegExp( `^(${ codes.join( '|' ) })$` );

	}

	//
	// Constructor
	//

	constructor() {

		this.isActionRegex   = this._createIsRegex();
		this.isInputRegex    = this._createIsRegex( 'input' );
		this.isCommandRegex  = this._createIsRegex( 'command' );
		this.isShortcutRegex = this._createIsRegex( 'shortcut' );

		this.is = this.is.bind( this );

	}

	//
	// Is
	//

	is( code, type ) {

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

	//
	// Get
	//

	get( code, type, options ) {

		const action = data.find( ( action ) => {

			return action.code === code && ( !type || action.type === type );

		} );

		return Object.assign( action, options || {} );

	}

	//
	// Dispatch
	//

	dispatch( action ) {

		const customEvent = new CustomEvent( 'action', { detail: action } );
		document.dispatchEvent( customEvent );

	}

}

export default Actions;
