//
// Radios
//
// :: Constructor
// :: State Methods
// :: Render
// :: Properties

import React     from 'react';
import PropTypes from 'prop-types';
import ShortID   from 'shortid';
import Radio     from './Radio';

// <Radios name="foo" options={ [
// 	{ label: 'foobar', value: 'foo' },
// 	{ label: 'barbaz', value: 'bar' },
// 	{ label: 'bazfoo', value: 'baz' }
// ] } />

class Radios extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );

		this.state = {
			disabled: this.props.disabled,
		};
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
	// Render
	//

	render() {
		return (
			<div className="form-radios">
				{ this.props.data.map( ( button ) => (
					<Radio
						key={ ShortID.generate() }
						name={ this.props.name }
						disabled={ this.props.disabled }
						{ ...button }
					/>
				) ) }
			</div>
		);
	}
}

//
// Properties
//

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
