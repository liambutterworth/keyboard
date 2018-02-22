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

		this.minDegree       = -65;
		this.maxDegree       = 250;
		this.resistance      = 0.12;
		this.initialValue    = 0;
		this.previousValue   = 0;
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

		this.initialValue = this.initialValue || parseInt( this.range.value, 10 );

		const relativeValue = this.range.value - this.initialValue;
		const currentValue  = this.initialValue + relativeValue;
		const updatedValue  = this.value + ( relativeValue * this.resistance );

		if (
			updatedValue < this.props.min ||
			updatedValue > this.props.max ||
			( this.initialValue < currentValue && currentValue < this.previousValue ) ||
			( this.previousValue < currentValue && currentValue < this.initialValue )
		) {

			this.initialValue  = 0;
			this.previousValue = 0;

		} else {

			this.previousValue = currentValue;
			this.value         = Math.round( updatedValue * 100 ) / 100;

			const percent = ( this.value - this.props.min ) / ( this.props.max - this.props.min );
			const degree  = percent * ( this.maxDegree - this.minDegree ) + this.minDegree;

			this.marker.style.transform = `rotate( ${ degree }deg )`;

		}

	}

	handleMouseDown() {

		if ( !this.state.adjustable ) this.setState( { adjustable: true } );

	}

	handleMouseUp() {

		this.initialValue = 0;
		if ( this.state.adjustable ) this.setState( { adjustable: false } );
		if ( this.props.onChange ) this.props.onChange( this.value );

	}

	renderNumbers() {

		if ( this.props.numbered ) {

			return (
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
			);

		}

	}

	render() {

		const classNames = ClassNames( {
			'form-knob':             true,
			'form-knob--adjustable': this.state.adjustable,
			'form-knob--numbered':   this.props.numbered,
		} );

		return (
			<div className={ classNames }>
				<label className="form-knob-label">Foobar</label>

				<div className="form-knob-body">
					{ this.renderNumbers() }

					<div className="form-knob-cap">
						<div
							className="form-knob-marker"
							ref={ ( marker ) => ( this.marker = marker ) }
						/>

						<input
							type="range"
							min={ this.props.min }
							max={ this.props.max }
							disabled={ this.state.disabled }
							onMouseDown={ this.handleMouseDown }
							onMouseUp={ this.handleMouseUp }
							onInput={ this.handleInput }
							ref={ ( range ) => ( this.range = range ) }
						/>
					</div>
				</div>
			</div>
		);

	}

}

Knob.defaultProps = {
	onChange: false,
	disabled: false,
	numbered: false,
	value:    0,
	min:      0,
	max:      100,
};

Knob.propTypes = {
	onChange: PropTypes.func,
	numbered: PropTypes.bool,
	disabled: PropTypes.bool,
	value:    PropTypes.number,
	min:      PropTypes.number,
	max:      PropTypes.number,
};

export default Knob;
