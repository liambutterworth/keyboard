import React                    from 'react';
import PropTypes                from 'prop-types';
import Button                   from './Button';
import Select                   from './Select';
import Radios, { Radio }        from './Radios';
import Checkboxes, { Checkbox } from './Checkboxes';

require( './style.css' );

class Form extends React.Component {

	constructor( props ) {

		super( props );

		this.handleSubmit = this.handleSubmit.bind( this );

	}

	handleSubmit( event ) {

		event.preventDefault();
		console.log( 'submit form' );

	}

	render() {

		return (
			<form onSubmit={ this.handleSubmit }>
				{ this.props.children }
			</form>
		);

	}

}

Form.propTypes = {
	children: PropTypes.node,
}

export default Form;

export {
	Select,
	Radio,
	Radios,
	Checkbox,
	Checkboxes
};
