import React from 'react';
import PropTypes from 'prop-types';
import ShortID from 'shortid';

require( './style.css' );

class Range extends React.Component {

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
			<input
				className="form-range"
				type="range"
				disabled={ this.state.disabled }
			/>
		);

	}

}

Range.defaultProps = {
	disabled: false,
};

Range.propTypes = {
	disabled: PropTypes.bool,
};

export default Range;
