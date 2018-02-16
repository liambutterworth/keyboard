import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';

require( './style.css' );

class Knob extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			disabled:   props.disabled,
			adjustable: false,
		};

		this.value  = this.props.value;
		this.median = 50;

		this.adjust     = this.adjust.bind( this );
		this.activate   = this.activate.bind( this );
		this.deactivate = this.deactivate.bind( this );

	}

	disable() {

		if ( !this.state.disabled ) this.setState( { disabled: true } );

	}

	enable() {

		if ( this.state.disabled ) this.setState( { disabled: false } );

	}

	adjust( event ) {

		this.value = event.target.value - this.median;

	}

	activate() {

		if ( !this.state.adjustable ) this.setState( { adjustable: true } );

	}

	deactivate() {

		if ( this.state.adjustable ) this.setState( { adjustable: false } );
		this.element.value = this.median;
		if ( this.props.onUpdate ) this.props.onUpdate( this.value );

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
					onInput={ this.adjust }
					disabled={ this.state.disabled }
					onMouseDown={ this.activate }
					onMouseUp={ this.deactivate }
					ref={ ( element ) => ( this.element = element ) }
				/>
			</div>
		);

	}

}

Knob.defaultProps = {
	disabled: false,
	value:    50,
	onUpdate: false,
};

Knob.propTypes = {
	disabled: PropTypes.bool,
	value:    PropTypes.number,
	onUpdate: PropTypes.func,
};

export default Knob;
