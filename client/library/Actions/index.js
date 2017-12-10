//
// Actions
//
// :: All
// :: Create Is Regex
// :: Constructor
// :: Is Methods
// :: Get Methods
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
	// Is Methods
	//

	isAction( code ) {

		return this.isActionRegex.test( code );

	}

	isInput( code ) {

		return this.isInputRegex.test( code );

	}

	isCommand( code ) {

		return this.isCommandRegex( code );

	}

	isShortcut( code ) {

		return this.isShortcutRegex( code );

	}

	//
	// Get Methods
	//

	getAction( code, type, options ) {

		const action = data.find( ( action ) => {

			return action.code === code && ( !type || action.type === type );

		} );

		return Object.assign( action, options || {} );

	}

	getInput( code, options ) {

		const input = this.getAction( code, 'input', options )
		return Object.assign( input, options || {} );

	}

	getCommand( code, options ) {

		const command = this.getAction( code, 'command', options );
		return Object.assign( command, options || {} );

	}

	getShortcut( code, options ) {

		const shortcut = this.getAction( code, 'shortcut', options );
		return Object.assign( shortcut, options || {} );

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
