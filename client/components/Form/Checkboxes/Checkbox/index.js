import React     from 'react';
import PropTypes from 'prop-types';
import ShortID   from 'shortid';

require( './style.css' );

class Checkbox extends React.Component {

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

		const uuid = ShortID.generate();

		return (
			<div className="form-checkbox">
				<input
					type="checkbox"
					id={ uuid }
					name={ this.props.name }
					value={ this.props.value }
					disabled={ this.props.disabled }
					onClick={ this.props.onChange }
				/>

				<label htmlFor={ uuid }>
					<span className="form-checkbox-box" />
					{ this.props.label }
				</label>
			</div>
		);

	}

}

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
