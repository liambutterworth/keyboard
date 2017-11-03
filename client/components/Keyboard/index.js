import React     from 'react';
import PropTypes from 'prop-types';
import ShortID   from 'shortid';
import Key       from './Key';

require( './style.css' );

class Keyboard extends React.Component {
	constructor( props ) {
		super( props );

		this.keys = [];

		document.addEventListener( 'keydown', this.handleKeydown.bind( this ) );
		document.addEventListener( 'keyup', this.handleKeyup.bind( this ) );
	}

	getKeyFromEvent( event ) {
		return this.keys.find( ( key ) => {
			const keyCode = event.key.length === 1 ? event.key.charCodeAt() : event.keyCode;
			return keyCode === key.code;
		} );
	}

	handleKeydown( event ) {
		if ( event.repeat ) return;
		event.preventDefault();
		const keyPressed = this.getKeyFromEvent( event );
		keyPressed.play();
	}

	handleKeyup( event ) {
		event.preventDefault();
		const keyPressed = this.getKeyFromEvent( event );
		keyPressed.stop();
	}

	render() {
		return (
			<div className="keyboard">
				{ this.props.keybinds.map( ( keybind ) => (
					<Key
						key={ ShortID.generate() }
						note={ keybind.note }
						keybind={ keybind.keybind }
						ref={ ( key ) => ( this.keys.push( key ) ) }
					/>
				) ) }
			</div>
		);
	}
}

Keyboard.defaultProps = {
	keybinds: [
		{ keybind: '\t', note: 'C' },
		{ keybind: '`',  note: 'Db' },
		{ keybind: 'q',  note: 'D' },
		{ keybind: '1',  note: 'Eb' },
		{ keybind: 'w',  note: 'E' },
		{ keybind: 'e',  note: 'F' },
		{ keybind: '3',  note: 'Gb' },
		{ keybind: 'r',  note: 'G' },
		{ keybind: '4',  note: 'Ab' },
		{ keybind: 't',  note: 'A' },
		{ keybind: '5',  note: 'Bb' },
		{ keybind: 'y',  note: 'B' },
		{ keybind: 'u',  note: 'C' },
		{ keybind: '7',  note: 'Db' },
		{ keybind: 'i',  note: 'D' },
		{ keybind: '8',  note: 'Eb' },
		{ keybind: 'o',  note: 'E' },
		{ keybind: 'p',  note: 'F' },
		{ keybind: '9',  note: 'Gb' },
		{ keybind: '[',  note: 'G' },
		{ keybind: '-',  note: 'Ab' },
		{ keybind: ']',  note: 'A' },
		{ keybind: '=',  note: 'Bb' },
		{ keybind: '\\', note: 'B' },
		{ keybind: '\b', note: 'C' },
	],
};

Keyboard.propTypes = {
	keybinds: PropTypes.arrayOf( PropTypes.shape( {
		keybind: PropTypes.string,
		note:    PropTypes.sting,
	} ) ),
};

export default Keyboard;
