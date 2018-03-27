//
// Prompt
//
// :: Constructor
// :: Mount Methods
// :: State Methods
// :: Event Handlers
// :: Render
// :: Properties

import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';

require( './style.css' );

class Prompt extends React.Component {

	//
	// Constructor
	//p

	constructor( props ) {
		super( props );

		this.state = {
			open: props.open,
		};

		this.element            = document;
		this.handleClosePrompts = this.handleClosePrompts.bind( this );
	}

	//
	// Mount Methods
	//

	componentWillMount() {
		this.element.addEventListener( 'close-prompts', this.handleClosePrompts );
	}

	componentWillUnmount() {
		this.element.remoevEventListener( 'close-prompts', this.handleClosePrompts );
	}

	//
	// State Methods
	//

	open() {
		this.setState( { open: true } );
	}

	close() {
		this.setState( { open: false } );
	}

	closeAll() {
		const event = new Event( 'close-prompts' );
		this.element.dispatchEvent( event );
	}

	toggle() {
		if ( this.state.open ) {
			this.close();
		} else {
			this.closeAll();
			this.open();
		}
	}

	//
	// Event Handlers
	//

	handleClosePrompts() {
		if ( this.state.open ) this.close();
	}

	//
	// Render
	//

	render() {
		const classNames = ClassNames( {
			'keyboard__prompt':       true,
			'keyboard__prompt--open': this.state.open,
		} );

		return (
			<div className={ classNames }>
				{ this.props.children }
			</div>
		);
	}
}

//
// Properties
//

Prompt.defaultProps = {
	children: null,
	open:     false,
};

Prompt.propTypes = {
	children: PropTypes.node,
	open:     PropTypes.bool,
};

export default Prompt;
