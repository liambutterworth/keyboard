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

		if ( !this.initialValue ) this.initialValue = this.element.value;
		this.relativeValue = this.element.value - this.initialValue;

	}

	handleMouseDown() {

		if ( !this.state.adjustable ) this.setState( { adjustable: true } );

	}

	handleMouseUp() {

		this.value         = this.value + this.relativeValue;
		this.initialValue  = undefined;
		this.relativeValue = undefined;

		if ( this.value < this.props.min ) {

			this.value = this.props.min;

		} else if ( this.value > this.props.max ) {

			this.value = this.props.max;

		}

		console.log( this.value );

		if ( this.state.adjustable ) this.setState( { adjustable: false } );
		if ( this.props.onChange ) this.props.onChange( this.value );

	}

	render() {

		const classNames = ClassNames( {
			'form-knob':             true,
			'form-knob--adjustable': this.state.adjustable,
		} );

		return (
			<div className={ classNames }>
				<ul className="form-knob-numbers">
					<li className="form-knob-0">0</li>
					<li className="form-knob-1">1</li>
					<li className="form-knob-2">2</li>
					<li className="form-knob-3">3</li>
					<li className="form-knob-4">4</li>
					<li className="form-knob-5">5</li>
					<li className="form-knob-6">6</li>
					<li className="form-knob-7">7</li>
					<li className="form-knob-8">8</li>
					<li className="form-knob-9">9</li>
					<li className="form-knob-10">10</li>
				</ul>

				<div className="form-knob-marker" />

				<div className="form-knob-cap">
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
			</div>
		);

	}

}

Knob.defaultProps = {
	onChange: false,
	disabled: false,
	value:    0,
	min:      0,
	max:      100,
};

Knob.propTypes = {
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	value:    PropTypes.number,
	min:      PropTypes.number,
	max:      PropTypes.number,
};

export default Knob;
