import React     from 'react';
import PropTypes from 'prop-types';
import ShortID   from 'shortid';

require( './style.css' );

class Radio extends React.Component {

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
			<div className="form-radio">
				<input
					type="radio"
					id={ uuid }
					name={ this.props.name }
					value={ this.props.value }
					disabled={ this.props.disabled }
				/>

				<label htmlFor={ uuid }>
					<span className="form-radio-box" />
					{ this.props.label }
				</label>
			</div>
		);

	}

}

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
