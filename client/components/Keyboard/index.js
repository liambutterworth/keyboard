import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';
import ShortID    from 'shortid';
import Key        from './Key';

require( './style.css' );

class Keyboard extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			mode: props.mode,
		}

		this.keys = [];

		this.handleKeydown = this.handleKeydown.bind( this );
		this.handleKeyup   = this.handleKeyup.bind( this );
	}

	componentWillMount() {
		this.context = new AudioContext();
		document.addEventListener( 'keydown', this.handleKeydown );
		document.addEventListener( 'keyup',   this.handleKeyup );
	}

	componentWillUnmount() {
		this.context.close();
		document.removeEventListener( 'keydown', this.handleKeydown );
		document.removeEventListener( 'keyup',   this.handleKeyup );
	}

	toggleMode() {
		if ( this.state.mode === 'INPUT' ) {
			this.setState( { mode: 'COMMAND' } );
		} else {
			this.setState( { mode: 'INPUT' } );
		}
	}

	playKey( key ) {
		key.play();
	}

	stopKey( key ) {
		key.stop();
	}

	getKeyFromEvent( event ) {
		const key = this.keys.find( ( key ) => {
			return event.which === key.props.code;
		} );

		return key;
	}

	handleKeydown( event ) {
		if ( event.metaKey ) return;

		if ( event.keyCode === this.props.toggle ) { // space
			this.toggleMode();
		} else if ( this.state.mode === 'INPUT' ) {
			const key = this.getKeyFromEvent( event );

			if ( key ) {
				event.preventDefault();
				if ( event.repeat ) return;
				this.playKey( key );
			}
		} else if ( this.state.mode === 'COMMAND' ) {
			console.log( 'enter command' );
		}
	}

	handleKeyup( event ) {
		if ( event.metaKey || event.keyCode === this.props.toggle ) return;

		if ( this.state.mode === 'INPUT' ) {
			const key = this.getKeyFromEvent( event );

			if ( key ) {
				event.preventDefault();
				this.stopKey( key );
			}
		}
	}

	renderKeys() {
		let octave = this.props.octave;

		return this.props.bindings.map( ( binding, index ) => {
			const key = (
				<Key
					key={ ShortID.generate() }
					code={ binding.code }
					note={ binding.note }
					octave={ octave }
					context={ this.context }
					ref={ ( key ) => ( this.keys[index] = key  ) }
				/>
			);

			if ( ( index + 1 ) % 12 === 0 ) octave += 1;

			return key;
		} );
	}

	render() {
		const classNames = ClassNames( {
			'keyboard':          true,
			'keyboard--input':   this.state.mode === 'INPUT',
			'keyboard--command': this.state.mode === 'COMMAND',
		} );

		return (
			<div className={ classNames }>
				<div className="keyboard-keys">
					{ this.renderKeys() }
				</div>
			</div>
		);
	}
}

Keyboard.defaultProps = {
	mode:   'INPUT',
	octave: 4,
	toggle: 32, // space

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
		{ code: 13,  note: 'C'  }, // enter
	],
};

Keyboard.propTypes = {
	mode:   PropTypes.string,
	octave: PropTypes.number,
	toggle: PropTypes.number,

	bindings: PropTypes.arrayOf(
		PropTypes.shape( {
			code: PropTypes.number,
			note: PropTypes.sting,
		} )
	),
};

export default Keyboard;
