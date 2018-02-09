import React from 'react';
import PropTypes from 'prop-types';
// import ShortID from 'shortid';

require( './style.css' );

class Knob extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			disabled: props.disabled,
		};

		this.currentValue = this.props.defaultValue;

		this.adjust = this.adjust.bind( this );
		this.click  = this.click.bind( this );
		this.input  = this.input.bind( this );

		this.setDiff = this.setDiff.bind( this );
		this.applyDiff = this.applyDiff.bind( this );

	}

	disable() {

		if ( !this.state.disabled ) this.setState( { disabled: true } );

	}

	enable() {

		if ( this.state.disabled ) this.setState( { disabled: false } );

	}

	adjust( event ) {
		// console.log( event.target.value );
	}

	click( event ) {
		// console.log( 'click' );
		// console.log( event.target.value );
	}

	input( event ) {
		// event.preventDefault();
		// console.log( 'input' );
		// console.log( event );
	}

	setDiff() {
		// console.log( 'mouse down: ' + this.currentValue );
		// this.currentValue = this.element.value;
		// console.log( this.currentValue, this.element.value );
	}

	applyDiff() {
		// console.log( 'mouse up' );
		// console.log( 'mouse up: ' + this.element.value );
	}

	componentDidMount() {
		this.currentValue = this.element.value;
		console.log( this.element.shadowRoot );
	}

	render() {

		return (
			<div className="form-knob">
				<input
					type="range"
					value={ this.props.value }
					onChange={ this.adjust }
					onInput={ this.input }
					onClick={ this.click }
					onMouseDown={ this.setDiff }
					onMouseUp={ this.applyDiff }
					disabled={ this.state.disabled }
					ref={ ( element ) => { this.element = element } }
				/>
			</div>
		);

	}

}

Knob.defaultProps = {
	disabled:     false,
	defaultValue: 50,
};

Knob.propTypes = {
	disabled:     PropTypes.bool,
	defaultValue: PropTypes.number,
};

export default Knob;
