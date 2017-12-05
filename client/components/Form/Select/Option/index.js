import React     from 'react';
import PropTypes from 'prop-types';

require( './style.css' );

class Option extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			disabled: props.disabled,
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
			<option
				disabled={ this.props.disabled }
				selected={ this.props.selected }
				value={ this.props.value }
			>
				{ this.props.label }
			</option>
		);

	}

}

Option.defaultProps = {
	disabled: false,
};

Option.propTypes = {
	label:    PropTypes.string.isRequired,
	value:    PropTypes.string.isRequired,
	disabled: PropTypes.bool,
};

export default Option;
