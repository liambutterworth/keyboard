import React     from 'react';
import PropTypes from 'prop-types';
import ShortID   from 'shortid';
import Checkbox  from './Checkbox';

require( './style.css' );

class Checkboxes extends React.Component {

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

		console.log( this.props.onChange );
		return (
			<div className="form-checkboxes">
				{ this.props.data.map( ( box ) =>

					<Checkbox
						key={ ShortID.generate() }
						name={ this.props.name }
						onChange={ this.props.onChange }
						disabled={ this.props.disabled }
						{ ...box }
					/>

				) }
			</div>
		);

	}

}

Checkboxes.defaultProps = {
	disabled: false,
	onChange: null,
};

Checkboxes.propTypes = {
	name:     PropTypes.string.isRequired,
	data:     PropTypes.array.isRequired,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
}

export default Checkboxes;
export { Checkbox };
