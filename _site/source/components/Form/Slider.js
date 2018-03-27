//
// Slider
//
// :: Constructor
// :: State Methods
// :: Render
// :: Properties

import React     from 'react';
import PropTypes from 'prop-types';

class Slider extends React.Component {

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
			<div className="form-slider">
				<input
					type="range"
					disabled={ this.state.disabled }
				/>
			</div>
		);
	}

}

//
// Properties
//

Slider.defaultProps = {
	disabled: false,
};

Slider.propTypes = {
	disabled: PropTypes.bool,
};

export default Slider;
