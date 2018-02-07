import React from 'react';
import PropTypes from 'prop-types';
// import ShortID from 'shortid';

require( './style.css' );

class Knob extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			disabled: props.disabled,
		};

		this.adjust = this.adjust.bind( this );

	}

	disable() {

		if ( !this.state.disabled ) this.setState( { disabled: true } );

	}

	enable() {

		if ( this.state.disabled ) this.setState( { disabled: false } );

	}

	adjust( event ) {
		console.log( event.target.value );
	}

	render() {

		return (
			<div className="form-knob">
				<input
					type="range"
					onChange={ this.adjust }
					disabled={ this.state.disabled }
				/>
			</div>
		);

	}

}

Knob.defaultProps = {
	disabled: false,
};

Knob.propTypes = {
	disabled: PropTypes.bool,
};

export default Knob;
