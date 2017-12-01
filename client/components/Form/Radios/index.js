import React     from 'react';
import PropTypes from 'prop-types';
import ShortID   from 'shortid'

class Radios extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			selected: this.props.checked,
		};

	}

	renderButtons() {

		return this.props.buttons.map( ( button ) => {

			return ( <input
				type="radio"
				key={ ShortID.generate() }
				name={ button.name }
				value={ button.value }
			/> );

		} );

	}

	render() {

		return (
			<div className="form-radios">
				{ this.renderButtons() }
			</div>
		);
	}

}

Radios.propTypes = {
	buttons: PropTypes.arrayOf( PropTypes.shape( {
		name:  PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
	} ) ),
};

export default Radios;
