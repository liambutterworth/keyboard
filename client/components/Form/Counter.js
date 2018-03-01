//
// Counter
//
// :: Constructor
// :: State Methods
// :: Event Handlers
// :: Render
// :: Properties

import React     from 'react';
import PropTypes from 'prop-types';
import ShortID   from 'shortid';

class Counter extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );

		this.state = {
			disabled: props.disabled,
		};

		this.handleChange = this.handleChange.bind( this );
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
	// Event Handlers
	//

	handleChange( event ) {
		const value = parseInt( event.target.value, 10 );
		this.props.onChange( value );
	}

	//
	// Render
	//

	render() {
		const id = ShortID.generate();

		return (
			<div className="form-number">
				<label htmlFor={ id }>{ this.props.label }</label>

				<input
					type="number"
					id={ id }
					step={ this.props.step }
					name={ this.props.name }
					disabled={ this.props.disabled }
					onChange={ this.handleChange }
					defaultValue={ this.props.defaultValue }
				/>
			</div>
		);
	}
}

//
// Properties
//

Counter.defaultProps = {
	step:     1,
	disabled: false,
	onChange: function() {},
};

Counter.propTypes = {
	name:     PropTypes.string.isRequired,
	label:    PropTypes.string.isRequired,
	step:     PropTypes.number,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,

	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
};

export default Counter;
