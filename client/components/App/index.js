//
// App
//
// :: Constructor
// :: Mount Events
// :: Toggle Mode
// :: Event Handlers
// :: Render
// :: Properties

import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';
import actions    from 'actions.json';
import Actions    from 'library/Actions';

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

		this.actions = new Actions();

		this.handleAction  = this.handleAction.bind( this );
		this.handleKeydown = this.handleKeydown.bind( this );
		this.handleKeyup   = this.handleKeyup.bind( this );

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
	// Toggle Mode
	//

	toggleMode() {

		this.setState( {
			mode: this.state.mode === 'INPUT' ? 'COMMAND' : 'INPUT',
		} );

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

		if ( this.state.mode === 'INPUT' && this.actions.is( code, 'input' ) ) {

			action = this.actions.get( code, 'input', { desc: 'play key' } );

		} else if ( this.state.mode === 'COMMAND' && this.actions.is( code, 'command' ) ) {

			action = this.actions.get( code, 'command' );

		} else if ( this.actions.is( code, 'shortcut' ) ) {

			action = this.actions.get( code, 'shortcut' );

		}

		if ( action ) this.actions.dispatch( action );

	}

	handleKeyup( event ) {

		const code = event.which;

		if (
			event.metaKey ||
			this.state.mode !== 'INPUT' ||
			!this.actions.is( code, 'input' )
		) return;

		event.preventDefault();
		const action = this.actions.get( code, 'input', { desc: 'stop key' } );
		this.actions.dispatch( action );

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
