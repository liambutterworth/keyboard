//
// Radio
//
// :: Constructor
// :: State Methods
// :: Render
// :: Properties

import React     from 'react';
import PropTypes from 'prop-types';
import ShortID   from 'shortid';

class Radio extends React.Component {

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
		const uuid = ShortID.generate();

		return (
			<div className="form__radio">
				<input
					type="radio"
					id={ uuid }
					name={ this.props.name }
					value={ this.props.value }
					disabled={ this.props.disabled }
				/>

				<label htmlFor={ uuid }>
					<span className="form__radio__box" />
					{ this.props.label }
				</label>
			</div>
		);
	}

}

//
// Properties
//

Radio.defaultProps = {
	disabled: false,
};

Radio.propTypes = {
	name:     PropTypes.string.isRequired,
	label:    PropTypes.string.isRequired,
	value:    PropTypes.string.isRequired,
	disabled: PropTypes.bool,
};

export default Radio;
