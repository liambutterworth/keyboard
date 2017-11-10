import React     from 'react';
import PropTypes from 'prop-types';
import ShortID   from 'shortid';
import Key       from './Key';

require( './style.css' );

class Keyboard extends React.Component {
	getKeyFromEvent( event ) {
		return this.keys.find( ( key ) => {
			const keyCode = event.key.length === 1 ? event.key.charCodeAt() : event.keyCode;
			return keyCode === key.code;
		} );
	}

	componentWillMount() {
		this.keys    = [];
		this.context = new AudioContext();
	}

	componentDidMount() {
		document.addEventListener( 'keydown', this.handleKeydown.bind( this ) );
		document.addEventListener( 'keyup', this.handleKeyup.bind( this ) );
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

	createKeys() {
		let octave = this.props.bottomOctave;

		return this.props.keybinds.map( ( keybind, index ) => {
			if ( ( index + 1 ) % 12 === 0 ) octave += 1;

			return (
				<Key
					key={ ShortID.generate() }
					octave={ octave }
					note={ keybind.note }
					keybind={ keybind.keybind }
					context={ this.context }
					ref={ ( key ) => ( this.keys.push( key ) ) }
				/>
			);
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

Keyboard.defaultProps = {
	bottomOctave: 4,

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
	bottomOctave: PropTypes.number,

	keybinds: PropTypes.arrayOf( PropTypes.shape( {
		keybind: PropTypes.string,
		note:    PropTypes.sting,
	} ) ),
};

export default Keyboard;
