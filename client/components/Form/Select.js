//
// Select
//
// :: Constructor
// :: State Methods
// :: Event Handlers
// :: Render
// :: Properties

import React     from 'react';
import PropTypes from 'prop-types';
import ShortID   from 'shortid';
import Option    from './Option';

// <Select name="foo" options={ [
// 	{ label: 'foobar', value: 'foo' },
// 	{ label: 'barbaz', value: 'bar' },
// 	{ label: 'bazfoo', value: 'baz' },
// ] } />

class Select extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );

		this.state = {
			disabled: props.disabled,
		};

		this.handleChange = this.handleChange.bind( this );
	}

	//
	// State Methods
	//

	disable() {
		if ( !this.state.disabled ) this.setState( { disabled: true } );
	}

	enable() {
		if ( this.state.disabled ) this.setState( { disabled: false } );
	}

	//
	// Event Handlers
	//

	handleChange( event ) {
		const value = this.props.returnType === 'number' ? parseInt( event.target.value, 10 ) : event.target.value;
		this.props.onChange( value );
	}

	//
	// Render
	//

	renderOptions( options ) {
		return options.map( ( option ) => {
			const key = ShortID.generate();
			let html;

			if ( option.value instanceof Array ) {
				html = ( <optgroup key={ key } label={ option.label }>{ this.renderOptions( option.value ) }</optgroup> );
			} else {
				html = ( <Option key={ key } { ...option } /> );
			}

			return html;
		} );
	}

	render() {
		return (
			<div className="form__select">
				<select
					name={ this.props.name }
					defaultValue={ this.props.defaultValue }
					required={ this.props.required }
					multiple={ this.props.multiple }
					disabled={ this.state.disabled }
					onChange={ this.handleChange }
				>
					{ this.renderOptions( this.props.options ) }
				</select>
			</div>
		);
	}
}

//
// Properties
//

Select.defaultProps = {
	required:     false,
	multiple:     false,
	disabled:     false,
	onChange:     function() {},
	returnType:   'string',
	defaultValue: '',
};

Select.propTypes = {
	name:     PropTypes.string.isRequired,
	options:  PropTypes.array.isRequired,
	required: PropTypes.bool,
	multiple: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,

	returnType: PropTypes.oneOf([
		'string',
		'number',
	]),

	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
};

export default Select;
