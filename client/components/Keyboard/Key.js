//
// Key
//
// :: Constructor
// :: Mount Methods
// :: State Methods
// :: Render
// :: Properties

import React       from 'react';
import PropTypes   from 'prop-types';
import ClassNames  from 'classnames';
import MusicTheory from 'music-theory';
import Tone        from 'tone';

class Key extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );

		this.state = {
			isPressed: false,
		};

		this.note  = new MusicTheory.Note( props.note );
		this.pitch = `${ this.note.symbol() }${ props.octave }`;
		this.frequency = Tone.Frequency( this.pitch ).toFrequency();

	}

	//
	// Mount Methods
	//

	componentDidMount() {
		this.oscillator1 = this.props.controls.oscillator1.create( this.frequency );
		this.oscillator2 = this.props.controls.oscillator2.create( this.frequency );
		this.filter      = this.props.controls.filter.create( this.frequency );
		this.envelope    = this.props.controls.envelope.create();
		this.volume      = this.props.controls.volume.get();

		const chain = [
			this.filter,
			this.envelope,
			this.volume,
			Tone.Master,
		];

		this.oscillator1.chain( ...chain ).start();
		this.oscillator2.chain( ...chain ).start();
	}

	//
	// State Methods
	//

	press() {
		if ( !this.state.isPressed ) this.setState( { isPressed: true } );
		this.envelope.triggerAttack();
		this.filter.envelope.triggerAttack();
	}

	release() {
		if ( this.state.isPressed ) this.setState( { isPressed: false } );
		this.envelope.triggerRelease();
		this.filter.envelope.triggerRelease();
	}

	highlight() {
		this.setState( { isHighlighted: true } );
	}

	unhighlight() {
		this.setState( { isHighlighted: false } );
	}

	//
	// Render
	//

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

//
// Properties
//

Key.propTypes = {
	note:   PropTypes.string.isRequired,
	octave: PropTypes.number.isRequired,
};

export default Key;
