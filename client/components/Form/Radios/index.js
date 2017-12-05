import React     from 'react';
import PropTypes from 'prop-types';
import ShortID   from 'shortid'
import Radio     from './Radio';

require( './style.css' );

class Radios extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			disabled: this.props.disabled,
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
			<div className="form-radios">
				{ this.props.data.map( ( button ) =>

					<Radio
						key={ ShortID.generate() }
						name={ this.props.name }
						disabled={ this.props.disabled }
						{ ...button }
					/>

	 			) }
			</div>
		);
	}

}

Radios.defaultProps = {
	disabled: false,
};

Radios.propTypes = {
	name:     PropTypes.string.isRequired,
	data:     PropTypes.array.isRequired,
	disabled: PropTypes.bool,
};

export default Radios;
export { Radio };
