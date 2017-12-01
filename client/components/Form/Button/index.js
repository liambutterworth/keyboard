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
				onClick={ this.props.handleClick }
			/>
		);

	}

}

Button.defaultProps = {
	value:       "",
	disabled:    false,
	handleClick: undefined,
};

Button.propTypes = {
	type:        PropTypes.string.isRequired,
	name:        PropTypes.string.isRequired,
	value:       PropTypes.string,
	disabled:    PropTypes.bool,
	handleClick: PropTypes.func,
};

export default Button;
