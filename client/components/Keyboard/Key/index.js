import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';
// import { Note }   from 'music-theory';
import MusicTheory from 'music-theory';

require( './style.css' );

class Key extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			isPressed: false,
		};

		this.note = new MusicTheory.Note( props.note );

	}

	play() {

		if ( this.state.isPressed ) return;
		this.setState( { isPressed: true } );
		this.oscillator = this.props.context.createOscillator();
		this.oscillator.frequency.value = this.note.frequency[ this.props.octave - 1 ];
		this.oscillator.connect( this.props.context.destination );
		this.oscillator.type = 'sine';
		this.oscillator.start();

	}

	stop() {

		if ( !this.state.isPressed ) return;
		this.setState( { isPressed: false } );
		this.oscillator.stop();

	}

	highlight() {

		this.setState( { isHighlighted: true } );

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
	code:  PropTypes.number.isRequired,
	note:  PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
};

export default Key;
