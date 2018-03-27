//
// Form
//
// :: Render
// :: Properties

import React                    from 'react';
import PropTypes                from 'prop-types';
import Button                   from './Button';
import Checkboxes, { Checkbox } from './Checkboxes';
import Counter                  from './Counter';
import Knob                     from './Knob';
import Radios, { Radio }        from './Radios';
import Select                   from './Select';
import Slider                   from './Slider';

require( './style.css' );

//
// Render
//

const Form = ( props ) => (
	<form onSubmit={ props.onSubmit }>
		{ props.children }
	</form>
);

//
// Properties
//

Form.defaultProps = {
	children: null,
	onSubmit: null,
};

Form.propTypes = {
	children: PropTypes.node,
	onSubmit: PropTypes.func,
};

export default Form;

export {
	Button,
	Checkboxes,
	Checkbox,
	Counter,
	Knob,
	Radios,
	Radio,
	Select,
	Slider,
};
