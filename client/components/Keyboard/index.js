import React     from 'react';
import PropTypes from 'prop-types';
import ShortID   from 'shortid';
import Key       from './Key';

require( './style.css' );

class Keyboard extends React.Component {
	getKeyFromEvent( event ) {
		return this.keys.find( ( key ) => {
			return event.which === key.props.code;
		} );
	}

	isBoundKey( event ) {
		const key = this.getKeyFromEvent( event );
		return key !== undefined;
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
		if ( window.mode !== 'INPUT' || event.metaKey ) return;

		const key = this.getKeyFromEvent( event );

		if ( key ) {
			event.preventDefault();
			if ( event.repeat ) return;
			key.play();
		}
	}

	handleKeyup( event ) {
		if ( window.mode !== 'INPUT' || event.metaKey ) return;

		const key = this.getKeyFromEvent( event );

		if ( key ) {
			event.preventDefault();
			key.stop();
		}
	}

	createKeys() {
		let octave = this.props.bottomOctave;

		return this.props.bindings.map( ( binding, index ) => {
			const key = (
				<Key
					key={ ShortID.generate() }
					code={ binding.code }
					note={ binding.note }
					octave={ octave }
					context={ this.context }
					ref={ ( key ) => ( this.keys.push( key ) ) }
				/>
			);

			if ( ( index + 1 ) % 12 === 0 ) octave += 1;

			return key;
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

	bindings: [
		{ code: 9,   note: 'C'  }, // tab
		{ code: 49,  note: 'Db' }, // 1
		{ code: 81,  note: 'D'  }, // q
		{ code: 50,  note: 'Eb' }, // 2
		{ code: 87,  note: 'E'  }, // w
		{ code: 69,  note: 'F'  }, // e
		{ code: 52,  note: 'Gb' }, // 4
		{ code: 82,  note: 'G'  }, // r
		{ code: 53,  note: 'Ab' }, // 5
		{ code: 84,  note: 'A'  }, // t
		{ code: 54,  note: 'Bb' }, // 6
		{ code: 89,  note: 'B'  }, // y
		{ code: 85,  note: 'C'  }, // u
		{ code: 56,  note: 'Db' }, // 8
		{ code: 73,  note: 'D'  }, // i
		{ code: 57,  note: 'Eb' }, // 9
		{ code: 79,  note: 'E'  }, // o
		{ code: 80,  note: 'F'  }, // p
		{ code: 189, note: 'Gb' }, // -
		{ code: 219, note: 'G'  }, // [
		{ code: 187, note: 'Ab' }, // =
		{ code: 221, note: 'A'  }, // ]
		{ code: 8,   note: 'Bb' }, // delete
		{ code: 220, note: 'B'  }, // \
	],
};

Keyboard.propTypes = {
	bottomOctave: PropTypes.number,

	bindings: PropTypes.arrayOf( PropTypes.shape( {
		code: PropTypes.number,
		note: PropTypes.sting,
	} ) ),
};

export default Keyboard;
