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
	// Constructor
	//

	constructor() {

		this.data    = data;
		this.element = document;

		this.element.addAction = this.addAction.bind( this );

	}

	//
	// Add
	//

	addAction( action ) {

		this.actions.push( action )

	}

	//
	// Is Methods
	//

	createIsRegex( type ) {

		const actions = this.data.filter( ( action ) => ( !type || action.type === type ) );
		const codes   = actions.map( ( action ) => ( action.code ) );

		return new RegExp( `^(${ codes.join( '|' ) })$` );

	}

	isAction( code, type ) {

		const regex = this.createIsRegex( type );
		return regex.test( code );

	}

	isInput( code ) {

		return this.isAction( code, 'input' );

	}

	isCommand( code ) {

		return this.isAction( code, 'command' );

	}

	isShortcut( code ) {

		return this.isAction( code, 'shortcut' );

	}

	//
	// Get Methods
	//

	getAction( code, type, options ) {

		const action = this.data.find( ( entry ) => ( entry.code === code && ( !type || entry.type === type ) ) );
		return Object.assign( action, options || {} );

	}

	getInput( code, options ) {

		const input = this.getAction( code, 'input', options );
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
		this.element.dispatchEvent( customEvent );

	}

}

export default Actions;
