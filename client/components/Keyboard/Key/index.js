import React      from 'react';
import ClassNames from 'classnames';
import { Note }   from 'music-theory';

require( './style.css' );

class Key extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			isPressed: false,
		};

		this.note = new Note( this.props.note );
		this.code = this.props.keybind.charCodeAt();
	}

	play() {
		this.setState({ isPressed: true })
		console.log( `play a ${ this.note.symbol() }` );
	}

	stop() {
		this.setState({ isPressed: false });
		console.log( `stop playing a ${ this.note.symbol() }` );
	}

	render() {
		const classNames = ClassNames({
			'keyboard-key':             true,
			'keyboard-key--accidental': this.note.isAccidental,
			'keyboard-key--is-pressed': this.state.isPressed,
		});

		return (
			<div className={ classNames } />
		);
	}
}

export default Key;
