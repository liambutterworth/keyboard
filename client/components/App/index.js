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

		Actions.add([
			{ type: 'shortcut', char: ' ', code: 32, desc: 'toggle mode' },
		]);

		this.handleKeydown = this.handleKeydown.bind( this );
		this.handleKeyup   = this.handleKeyup.bind( this );
		this.handleAction  = this.handleAction.bind( this );
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
		this.setState({
			mode: this.state.mode === 'INPUT' ? 'COMMAND' : 'INPUT',
		});
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

		if ( this.state.mode === 'INPUT' && Actions.isInput( code )) {
			action = Actions.getInput( code, { delegator: 'keydown' });
		} else if ( this.state.mode === 'COMMAND' && Actions.isCommand( code )) {
			action = Actions.getCommand( code, { delegator: 'keydown' });
		} else if ( Actions.isShortcut( code )) {
			action = Actions.getShortcut( code, { delegator: 'keydown' });
		}

		if ( action ) Actions.dispatch( action );
	}

	handleKeyup( event ) {
		const code = event.which;

		if (
			event.metaKey ||
			this.state.mode !== 'INPUT' ||
			!Actions.isInput( code )
		) return;

		event.preventDefault();
		const action = Actions.getInput( code, { delegator: 'keyup' });
		Actions.dispatch( action );
	}

	//
	// Render
	//

	render() {
		const classNames = ClassNames({
			'input-mode':   this.state.mode === 'INPUT',
			'command-mode': this.state.mode === 'COMMAND',
		});

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
