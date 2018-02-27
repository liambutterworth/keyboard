import React     from 'react';
import PropTypes from 'prop-types';

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
	selected: false,
};

Option.propTypes = {
	label:    PropTypes.string.isRequired,
	value:    PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	selected: PropTypes.bool,
};

export default Option;
