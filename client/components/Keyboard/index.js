import React from 'react';
import shortid from 'shortid';
import { Note } from 'music-theory';
import Key   from './Key';

require( './style.css' );

class Keyboard extends React.Component {
	constructor( props ) {
		super( props );

		this.keys = {
			'tab': new Note( 'C' ),
			'q':   new Note( 'D' ),
			'w':   new Note( 'E' ),
			'e':   new Note( 'F' ),
			'r':   new Note( 'G' ),
			't':   new Note( 'A' ),
			'y':   new Note( 'B' ),
			'u':   new Note( 'C' ),
			'i':   new Note( 'D' ),
			'o':   new Note( 'E' ),
			'p':   new Note( 'F' ),
			'[':   new Note( 'G' ),
			']':   new Note( 'A' ),
			'\\':  new Note( 'B' ),
			'del': new Note( 'C' ),
		};
	}

	createKeys() {
		return Object.keys( this.keys ).map( ( key, index ) => {
			return ( <Key key={ shortid.generate() } note={ this.keys[ key ] } keybind={ key } /> );
		} );
	}

	render() {
		return (
			<div className="keyboard">
				{ this.createKeys() }
			</div>
		);
	}
}

export default Keyboard;
