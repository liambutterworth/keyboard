//
// Checkbox
//
// :: Constructor
// :: State Methods
// :: Render
// :: Properties

import React     from 'react';
import PropTypes from 'prop-types';
import ShortID   from 'shortid';

class Checkbox extends React.Component {

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
		const id = ShortID.generate();

		return (
			<div className="form__checkbox">
				<input
					type="checkbox"
					id={ id }
					name={ this.props.name }
					value={ this.props.value }
					disabled={ this.props.disabled }
					onChange={ this.props.onChange }
				/>

				<label htmlFor={ id }>
					<span className="form__checkbox__box" />
					{ this.props.label }
				</label>
			</div>
		);
	}

}

//
// Properties
//

Checkbox.defaultProps = {
	disabled: false,
	onChange: null,
};

Checkbox.propTypes = {
	name:     PropTypes.string.isRequired,
	label:    PropTypes.string.isRequired,
	value:    PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
};

export default Checkbox;
