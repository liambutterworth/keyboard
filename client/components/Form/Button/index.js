import React      from 'react';
import PropTypes  from 'prop-types';

require( './style.css' );

class Button extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			disabled: false,
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
	text:     "",
	name:     "",
	value:    "",
	children: null,
	disabled: false,
	onClick:  null,
};

Button.propTypes = {
	type:     PropTypes.string.isRequired,
	text:     PropTypes.string,
	name:     PropTypes.string,
	value:    PropTypes.string,
	children: PropTypes.node,
	disabled: PropTypes.bool,
	onClick:  PropTypes.func,
};

export default Button;
