//
// Button
//
// :: Constructor
// :: State Methods
// :: Render
// :: Properties

import React     from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );

		this.state = {
			disabled: this.props.disabled,
		};
	}

	//
	// State Methods
	//

	disable() {
		if ( !this.state.disabled ) this.setState( { disabled: true } );
	}

	enable() {
		if ( this.state.disabled ) this.setState( { disabled: false } );
	}

	//
	// Render
	//

	render() {
		return (
			<button
				className="form__button"
				type={ this.props.type }
				name={ this.props.name }
				value={ this.props.value }
				disabled={ this.state.disabled }
				onClick={ this.props.onClick }
			>
				{ this.props.children || this.props.text }
			</button>
		);
	}
}

//
// Properties
//

Button.defaultProps = {
	text:     '',
	name:     '',
	value:    '',
	disabled: false,
	children: null,
	onClick:  null,
};

Button.propTypes = {
	type:     PropTypes.string.isRequired,
	text:     PropTypes.string,
	name:     PropTypes.string,
	value:    PropTypes.string,
	disabled: PropTypes.bool,
	children: PropTypes.node,
	onClick:  PropTypes.func,
};

export default Button;
