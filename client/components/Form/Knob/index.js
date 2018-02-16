import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';

require( './style.css' );

class Knob extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			adjustable: false,
			disabled:   props.disabled,
		};

		this.value           = this.props.value;
		this.median          = this.props.max / 2;
		this.handleMouseDown = this.handleMouseDown.bind( this );
		this.handleMouseUp   = this.handleMouseUp.bind( this );
		this.handleInput     = this.handleInput.bind( this );

	}

	disable() {

		if ( !this.state.disabled ) this.setState( { disabled: true } );

	}

	enable() {

		if ( this.state.disabled ) this.setState( { disabled: false } );

	}

	handleInput() {

		this.value = this.element.value - this.median;
		console.log( this.value );

	}

	handleMouseDown() {

		this.element.value = this.median;
		if ( !this.state.adjustable ) this.setState( { adjustable: true } );

	}

	handleMouseUp() {

		this.offset        = false;
		this.element.value = this.median;

		if ( this.state.adjustable ) this.setState( { adjustable: false } );
		// if ( this.props.onChange ) this.props.onChange( this.state.value );

	}

	render() {

		const classNames = ClassNames( {
			'form-knob':             true,
			'form-knob--adjustable': this.state.adjustable,
		} );

		return (
			<div className={ classNames }>
				<input
					type="range"
					min={ this.props.min }
					max={ this.props.max }
					disabled={ this.state.disabled }
					onMouseDown={ this.handleMouseDown }
					onMouseUp={ this.handleMouseUp }
					onInput={ this.handleInput }
					ref={ ( element ) => ( this.element = element ) }
				/>
			</div>
		);

	}

}

Knob.defaultProps = {
	onChange: false,
	disabled: false,
	value:    50,
	min:      0,
	max:      200,
};

Knob.propTypes = {
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	value:    PropTypes.number,
	min:      PropTypes.number,
	max:      PropTypes.number,
};

export default Knob;
