import React     from 'react';
import PropTypes from 'prop-types';

require( './style.css' );

class Button extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			disabled: this.props.disabled,
		};

	}

	disable() {

		if ( !this.state.disabled ) this.setState( { disabled: true } );

	}

	enable() {

		if ( this.state.disabled ) this.setState( { disabled: false } );

	}

	render() {

		return (
			<button
				className="form-button"
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
