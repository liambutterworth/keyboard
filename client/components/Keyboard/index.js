import React    from 'react';
import shortid  from 'shortid';
import { Note } from 'music-theory';
import Key      from './Key';

require( './style.css' );

const defaultKeybinds = [
	{ keybind: '\t', note: 'C' },
	{ keybind: 'q',  note: 'D' },
	{ keybind: 'w',  note: 'E' },
	{ keybind: 'e',  note: 'F' },
	{ keybind: 'r',  note: 'G' },
	{ keybind: 't',  note: 'A' },
	{ keybind: 'y',  note: 'B' },
	{ keybind: 'u',  note: 'C' },
	{ keybind: 'i',  note: 'D' },
	{ keybind: 'o',  note: 'E' },
	{ keybind: 'p',  note: 'F' },
	{ keybind: '[',  note: 'G' },
	{ keybind: ']',  note: 'A' },
	{ keybind: '\\', note: 'B' },
	{ keybind: '\b', note: 'C' },
];

class Keyboard extends React.Component {
	constructor( props ) {
		super( props );

		this.handleKeyPress = this.handleKeyPress.bind( this );
		this.keybinds = this.props.keybinds || defaultKeybinds;
	}

	componentWillMount() {
		this.keys = this.keybinds.map( ( keybind ) => {
			return (
				<Key
					key={ shortid.generate() }
					note={ new Note( keybind.note ) }
					keybind={ keybind.keybind }
				/>
			);
		} );

		document.addEventListener( 'keypress', this.handleKeyPress );
	}

	componentWillUnmount() {
	}

	handleKeyPress( event ) {
		const keyPressed = this.keys.find( ( key ) => {
			return key.props.keybind.charCodeAt() === event.charCode;
		} );

		console.log( `play a ${ keyPressed.props.note.symbol() }` );
	}

	createKeys() {
		return Object.keys( this.keys ).map( ( key, index ) => {
			return ( <Key key={ shortid.generate() } note={ this.keys[ key ] } keybind={ key } /> );
		} );
	}

	render() {
		return (
			<div className="keyboard">
				{ this.keys }
			</div>
		);
	}
}

export default Keyboard;
