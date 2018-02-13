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

		this.defaultValue = 50;

		this.adjust       = this.adjust.bind( this );
		this.enableScrub  = this.enableScrub.bind( this );
		this.disableScrub = this.disableScrub.bind( this );

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

	enableScrub( event ) {

		if ( !this.state.adjustable ) this.setState( { adjustable: true } );

	}

	disableScrub( event ) {

		if ( this.state.adjustable ) this.setState( { adjustable: false } );
		this.element.value = this.defaultvalue;

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
					onMouseDown={ this.enableScrub }
					onMouseUp={ this.disableScrub }
					ref={ ( element ) => ( this.element = element ) }
				/>
			</div>
		);

	}

}

Knob.defaultProps = {
	disabled: false,
};

Knob.propTypes = {
	disabled: PropTypes.bool,
};

export default Knob;
