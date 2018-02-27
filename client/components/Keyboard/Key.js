import React       from 'react';
import PropTypes   from 'prop-types';
import ClassNames  from 'classnames';
import MusicTheory from 'music-theory';

class Key extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			isPressed: false,
		};

		this.note  = new MusicTheory.Note( props.note );
		this.pitch = `${ this.note.symbol() }${ this.props.octave }`;

	}

	press() {

		if ( !this.state.isPressed ) this.setState( { isPressed: true } );
		this.oscillators = this.props.getOscillators( this.pitch );
		this.oscillators.forEach( ( oscillator ) => ( oscillator.start() ) );

	}

	release() {

		if ( this.state.isPressed ) this.setState( { isPressed: false } );
		this.oscillators.forEach( ( oscillator ) => ( oscillator.stop().dispose() ) );

	}

	highlight() {

		this.setState( { isHighlighted: true } );

	}

	unhighlight() {

		this.setState( { isHighlighted: false } );

	}

	render() {

		const classNames = ClassNames( {
			'keyboard-key':                 true,
			'keyboard-key--accidental':     this.note.isAccidental,
			'keyboard-key--is-pressed':     this.state.isPressed,
			'keyboard-key--is-highlighted': this.state.isHighlighted,
		} );

		return (
			<div className={ classNames } />
		);

	}

}

Key.propTypes = {
	note:   PropTypes.string.isRequired,
	octave: PropTypes.number.isRequired,
};

export default Key;
