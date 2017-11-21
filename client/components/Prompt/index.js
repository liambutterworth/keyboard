//
// Prompt
//
// :: Constructor
// :: Component Will Mount
// :: Component Will Unmount
// :: Open
// :: Close
// :: Close All
// :: Toggle
// :: Handle Close Prompts
// :: Render
// :: Default Props
// :: Prop Types

import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';

require( './style.css' );

class Prompt extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {

		super( props );

		this.state = {
			open: props.open,
		};

		this.handleClosePrompts = this.handleClosePrompts.bind( this );

	}

	//
	// Component Will Mount
	//

	componentWillMount() {

		document.addEventListener( 'close-prompts', this.handleClosePrompts );

	}

	//
	// Component Will Unmount
	//

	componentWillUnmount() {

		document.remoevEventListener( 'close-prompts', this.handleClosePrompts );

	}

	//
	// Open
	//

	open() {

		this.setState( { open: true } );

	}

	//
	// Close
	//

	close() {

		this.setState( { open: false } );

	}

	//
	// Close All
	//

	closeAll() {

		const event = new Event( 'close-prompts' );
		document.dispatchEvent( event );

	}

	//
	// Toggle
	//

	toggle() {

		if ( this.state.open ) {

			this.setState( { open: false } );

		} else {

			this.closeAll();
			this.setState( { open: true } );

		}

	}

	//
	// Handle Close Prompts
	//

	handleClosePrompts() {

		if ( this.state.open ) this.close();

	}

	//
	// Render
	//

	render() {

		const classNames = ClassNames( {
			'keyboard-prompt':       true,
			'keyboard-prompt--open': this.state.open,
		} );

		return (
			<div className={ classNames }>
				{ this.props.children }
			</div>
		);

	}

}

//
// Default Props
//

Prompt.defaultProps = {
	open: false,
};

//
// Prop Types
//

Prompt.propTypes = {
	open:     PropTypes.bool,
	children: PropTypes.node,
};

export default Prompt;
