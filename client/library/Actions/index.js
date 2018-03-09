//
// Actions
//
// :: Cache
// :: Add
// :: Is
// :: All
// :: Get
// :: Dispatch

const Actions = {

	//
	// Cache
	//

	cache: () => {
		if ( !document.actions ) document.actions = [];
		return document.actions;
	},

	//
	// Add
	//

	add: ( actions ) => {
		const cache = Actions.cache();

		actions.forEach( ( action ) => {
			if ( cache.indexOf( action ) === -1 ) cache.push( action );
		} );
	},

	//
	// Is
	//

	is: ( code, type ) => {
		const cache   = Actions.cache();
		const actions = cache.filter( ( action ) => ( !type || action.type === type ) );
		const codes   = actions.map( ( action ) => ( action.code ) );
		const regex   = new RegExp( `^(${ codes.join( '|' ) })$` );

		return regex.test( code );
	},

	isInput:    ( code ) => ( Actions.is( code, 'input' ) ),
	isCommand:  ( code ) => ( Actions.is( code, 'command' ) ),
	isShortcut: ( code ) => ( Actions.is( code, 'shortcut' ) ),

	//
	// All
	//

	all: ( type ) => {
		const cache = Actions.cache();
		return cache.filter( ( action ) => ( !type || action.type === type ) );
	},

	//
	// Get
	//

	get: ( code, type, options ) => {
		const cache  = Actions.cache();
		const action = cache.find( ( entry ) => ( entry.code === code && ( !type || entry.type === type ) ) );

		return Object.assign( action, options || {} );
	},

	getInput:    ( code, options ) => ( Actions.get( code, 'input', options ) ),
	getCommand:  ( code, options ) => ( Actions.get( code, 'command', options ) ),
	getShortcut: ( code, options ) => ( Actions.get( code, 'shortcut', options ) ),

	//
	// Dispatch
	//

	dispatch: ( action ) => {
		const customEvent = new CustomEvent( 'action', { detail: action } );
		document.dispatchEvent( customEvent );
	},
};

export default Actions;
