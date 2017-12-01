import React     from 'react';
import PropTypes from 'prop-types';
import ShortID   from 'shortid';

require( './style.css' );

class Select extends React.Component {

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

	renderOptions( options ) {

		return Object.keys( options ).map( ( key ) => {

			const value = options[key];
			const uuid  = ShortID.generate();

			if ( typeof value === 'object' ) {

				return ( <optgroup key={ uuid } label={ key } >{ this.renderOptions( value ) }</optgroup> );

			} else {

				return ( <option key={ uuid } value={ value }>{ key }</option> );

			}

		} );

	}

	render() {

		return (
			<select
				name={ this.props.name }
				defaultValue={ this.props.defaultValue }
				required={ this.props.required }
				multiple={ this.props.multiple }
				disabled={ this.state.disabled }
				onChange={ this.props.onChange }
			>
				{ this.renderOptions( this.props.options ) }
			</select>
		);

	}

}

Select.defaultProps = {
	required:     false,
	multiple:     false,
	disabled:     false,
	defaultValue: "",
	handleChange: null,
};

Select.propTypes = {
	name:         PropTypes.string.isRequired,
	required:     PropTypes.bool,
	multiple:     PropTypes.bool,
	disabled:     PropTypes.bool,
	onChange:     PropTypes.func,
	defaultValue: PropTypes.string,

	options: PropTypes.arrayOf( PropTypes.shape( {
		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
	} ) ),

	// options:      PropTypes.object.isRequired,
	// name:         PropTypes.string.isRequired,
	// selected:     PropTypes.string,
	// required:     PropTypes.bool,
	// multiple:     PropTypes.bool,
	// disabled:     PropTypes.bool,
	// handleChange: PropTypes.func,
};

export default Select;
