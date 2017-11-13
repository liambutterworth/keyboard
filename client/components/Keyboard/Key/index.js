import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';
import { Note }   from 'music-theory';

require( './style.css' );

class Key extends React.Component {
	componentWillMount() {
		this.state = {
			isPressed: false,
		};

		this.note = new Note( this.props.note );
	}

	play() {
		this.setState( { isPressed: true } );

		this.oscillator = this.props.context.createOscillator();
		this.oscillator.frequency.value = this.note.frequency[ this.props.octave ];
		this.oscillator.connect( this.props.context.destination );
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

Key.defaultProps = {

};

Key.propTypes = {
	code: PropTypes.number.isRequired,
	note: PropTypes.string.isRequired,
};

export default Key;
