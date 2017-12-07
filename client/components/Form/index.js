import React                    from 'react';
import PropTypes                from 'prop-types';
import Button                   from './Button';
import Select                   from './Select';
import Radios, { Radio }        from './Radios';
import Checkboxes, { Checkbox } from './Checkboxes';

require( './style.css' );

const Form = ( props ) => (
	<form onSubmit={ props.onSubmit }>
		{ props.children }
	</form>
);

Form.propTypes = {
	children: PropTypes.node,
	onSubmit: PropTypes.func,
}

export default Form;

export {
	Button,
	Select,
	Radios,
	Radio,
	Checkboxes,
	Checkbox,
};