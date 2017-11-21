import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';
import { Note }   from 'music-theory';

require( './style.css' );

class Key extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			isPressed: false,
		};

		this.note = new Note( props.note );
	}

	play() {
		this.setState( { isPressed: true } );
		this.oscillator = this.props.context.createOscillator();
		this.oscillator.frequency.value = this.note.frequency[ this.props.octave - 1 ];
		this.oscillator.connect( this.props.context.destination );
		this.oscillator.type = 'sawtooth';
		this.oscillator.start();
	}

	stop() {
		this.setState( { isPressed: false } );
		this.oscillator.stop();
	}

	render() {
		const classNames = ClassNames( {
			'keyboard-key':             true,
			'keyboard-key--accidental': this.note.isAccidental,
			'keyboard-key--is-pressed': this.state.isPressed,
		} );

		return (
			<div className={ classNames } />
		);
	}
}

Key.propTypes = {
	code: PropTypes.number.isRequired,
	note: PropTypes.string.isRequired,
};

export default Key;
