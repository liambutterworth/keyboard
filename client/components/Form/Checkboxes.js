import React     from 'react';
import PropTypes from 'prop-types';
import ShortID   from 'shortid';
import Checkbox  from './Checkbox';

// <Checkboxes name="checkbox-test" data={ [
// 	{ name: 'checkbox-test-1', label: 'Checkbox Test 1', value: '1' },
// 	{ name: 'checkbox-test-2', label: 'Checkbox Test 2', value: '2' },
// 	{ name: 'checkbox-test-3', label: 'Checkbox Test 3', value: '3' },
// ] } />

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

		return (
			<div className="form-checkboxes">
				{ this.props.data.map( ( box ) => (
					<Checkbox
						key={ ShortID.generate() }
						name={ this.props.name }
						onChange={ this.props.onChange }
						disabled={ this.props.disabled }
						{ ...box }
					/>
				) ) }
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
};

export default Checkboxes;
export { Checkbox };
