//
// Dispatcher
//
// :: Constructor
// :: Is Methods
// :: Event Handlers
// :: Event Methods

import data from './data.json';

class Dispatcher {

	//
	// Constructor
	//

	constructor() {

		const testRegex = ( type ) => {
			const entries = data.filter( ( entry ) => ( !type || entry.type === type ) );
			return new RegExp( `^(${ entries.map( ( entry ) => ( entry.code ) ).join( '|' ) })$` );
		};

		this.isKeyRegex      = testRegex();
		this.isInputRegex    = testRegex( 'input' );
		this.isCommandRegex  = testRegex( 'command' );
		this.isShortcutRegex = testRegex( 'shortcut' );

		this.handleKeydown = this.handleKeydown.bind( this );
		this.handleKeyup = this.handleKeyup.bind( this );

		document.addEventListener( 'keydown', this.handleKeydown );
		document.addEventListener( 'keyup', this.handleKeyup );

	}

	//
	// Is Methods
	//

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
	// Event Handlers
	//

	handleKeydown( event ) {

	}

	handleKeyup( event ) {

	}

	//
	// Event Methods
	//

	static on( type, callback ) {

		document.addEventListener( type, callback );

	}

	static off( type, callback ) {

		document.removeEventListener( type, callback );

	}

}

export default Dispatcher;
