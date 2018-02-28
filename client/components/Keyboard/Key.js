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
	}

	//
	// Mount Methods
	//

	componentDidMount() {
		this.oscillator1 = this.props.controls.oscillator1.create( this.pitch );
		this.oscillator2 = this.props.controls.oscillator2.create( this.pitch );
		this.ampEnvelope = this.props.controls.ampEnvelope.create();

		this.oscillator1.connect( this.ampEnvelope ).start();
		this.oscillator2.connect( this.ampEnvelope ).start();
		this.ampEnvelope.connect( Tone.Master );
	}

	//
	// State Methods
	//

	press() {
		if ( !this.state.isPressed ) this.setState( { isPressed: true } );
		this.ampEnvelope.triggerAttack();
	}

	release() {
		if ( this.state.isPressed ) this.setState( { isPressed: false } );
		this.ampEnvelope.triggerRelease();
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
