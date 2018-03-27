//
// Option
//
// :: Constructor
// :: State Methods
// :: Render
// :: Properties

import React     from 'react';
import PropTypes from 'prop-types';

class Option extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );

		this.state = {
			disabled: props.disabled,
		};
	}

	//
	// State Methods
	//

	disable() {
		if ( !this.state.disabled ) this.setState({ disabled: true });
	}

	enable() {
		if ( this.state.disabled ) this.setState({ disabled: false });
	}

	//
	// Render
	//

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

//
// Properties
//

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
