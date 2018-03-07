//
// Keyboard
//
// :: Constructor
// :: Mount Events
// :: Key Methods
// :: Event Handlers
// :: Render Methods
// :: Properties

import React            from 'react';
import PropTypes        from 'prop-types';
import ShortID          from 'shortid';
import Notes            from 'components/Notes';
import Grid, { Column } from 'components/Grid';
import Wrapper          from 'components/Wrapper';
import Actions          from 'library/Actions';
import Key              from './Key';
import Oscillator       from './Oscillator';
import Envelope         from './Envelope';
import Filter           from './Filter';
import Volume           from './Volume';

require( './style.css' );

class Keyboard extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );

		this.controls          = {};
		this.keys              = [];
		this.handleAction      = this.handleAction.bind( this );
		this.handleNotesChange = this.handleNotesChange.bind( this );

		Actions.add( [
			{ type: 'input', char: 'z', code: 90, note: 'C',  desc: 'toggle key' },
			{ type: 'input', char: 's', code: 83, note: 'Db', desc: 'toggle key' },
			{ type: 'input', char: 'x', code: 88, note: 'D',  desc: 'toggle key' },
			{ type: 'input', char: 'd', code: 68, note: 'Eb', desc: 'toggle key' },
			{ type: 'input', char: 'c', code: 67, note: 'E',  desc: 'toggle key' },
			{ type: 'input', char: 'v', code: 86, note: 'F',  desc: 'toggle key' },
			{ type: 'input', char: 'g', code: 71, note: 'Gb', desc: 'toggle key' },
			{ type: 'input', char: 'b', code: 66, note: 'G',  desc: 'toggle key' },
			{ type: 'input', char: 'h', code: 72, note: 'Ab', desc: 'toggle key' },
			{ type: 'input', char: 'n', code: 78, note: 'A',  desc: 'toggle key' },
			{ type: 'input', char: 'j', code: 74, note: 'Bb', desc: 'toggle key' },
			{ type: 'input', char: 'm', code: 77, note: 'B',  desc: 'toggle key' },
			{ type: 'input', char: 'q', code: 81, note: 'C',  desc: 'toggle key' },
			{ type: 'input', char: '2', code: 50, note: 'Db', desc: 'toggle key' },
			{ type: 'input', char: 'w', code: 87, note: 'D',  desc: 'toggle key' },
			{ type: 'input', char: '3', code: 51, note: 'Eb', desc: 'toggle key' },
			{ type: 'input', char: 'e', code: 69, note: 'E',  desc: 'toggle key' },
			{ type: 'input', char: 'r', code: 82, note: 'F',  desc: 'toggle key' },
			{ type: 'input', char: '5', code: 53, note: 'Gb', desc: 'toggle key' },
			{ type: 'input', char: 't', code: 84, note: 'G',  desc: 'toggle key' },
			{ type: 'input', char: '6', code: 54, note: 'Ab', desc: 'toggle key' },
			{ type: 'input', char: 'y', code: 89, note: 'A',  desc: 'toggle key' },
			{ type: 'input', char: '7', code: 55, note: 'Bb', desc: 'toggle key' },
			{ type: 'input', char: 'u', code: 85, note: 'B',  desc: 'toggle key' },
			{ type: 'input', char: 'i', code: 73, note: 'C',  desc: 'toggle key' },
			{ type: 'input', char: '9', code: 57, note: 'Db', desc: 'toggle key' },
			{ type: 'input', char: 'o', code: 79, note: 'D',  desc: 'toggle key' },
			{ type: 'input', char: '0', code: 48, note: 'Eb', desc: 'toggle key' },
			{ type: 'input', char: 'p', code: 80, note: 'E',  desc: 'toggle key' },
		] );
	}

	//
	// Mount Events
	//

	componentWillMount() {
		document.addEventListener( 'action', this.handleAction );
	}

	componentWillUnmount() {
		document.removeEventListener( 'action', this.handleAction );
	}

	//
	// Key Methods
	//

	getKey( keyCode ) {
		return this.keys.find(( key ) => ( key.props.code === keyCode ));
	}

	playKey( keyCode ) {
		const key = this.getKey( keyCode );
		key.press();
	}

	stopKey( keyCode ) {
		const key = this.getKey( keyCode );
		key.release();
	}

	stopKeys() {
		this.keys.forEach(( key ) => ( key.release() ));
	}

	//
	// Event Handlers
	//

	handleAction( event ) {
		switch ( event.detail.desc ) {
			case 'toggle key':
				if ( event.detail.delegator === 'keydown' ) {
					this.playKey( event.detail.code );
				} else if ( event.detail.delegator === 'keyup' ) {
					this.stopKey( event.detail.code );
				}
				break;
		}
	}

	handleNotesChange( highlight, notes ) {
		const symbols = notes.symbols();

		this.keys.forEach(( key ) => {
			const symbol = key.note.symbol();

			if ( symbols.includes( symbol ) ) {
				key.highlight();
			} else {
				key.unhighlight();
			}
		});
	}

	//
	// Render Methods
	//

	renderKeys() {
		let octave = 3;

		return Actions.all( 'input' ).map( ( key, index ) => {
			const component = (
				<Key
					key={ ShortID.generate() }
					index={ index }
					code={ key.code }
					note={ key.note }
					synth={ this.synth }
					octave={ octave }
					context={ this.context }
					controls={ this.controls }
					ref={ ( self ) => ( this.keys[index] = self ) }
				/>
			);

			if ( ( index + 1 ) % 12 === 0 ) octave += 1;
			return component;
		} );
	}

	render() {
		return (
			<div className="keyboard">
				<Wrapper>
					<Notes onChange={ this.handleNotesChange } />

					<Grid>
						<Column span="2">
							<Oscillator
								heading="Oscillator 1"
								ref={ ( self ) => ( this.controls.oscillator1 = self ) }
							/>

							<Oscillator
								heading="Oscillator 2"
								ref={ ( self ) => ( this.controls.oscillator2 = self ) }
							/>
						</Column>

						<Column span="5">
							<Filter
								heading="Filter"
								ref={ ( self ) => ( this.controls.filter = self ) }
							/>
						</Column>

						<Column span="5">
							<Envelope
								heading="Amplifier"
								ref={ ( self ) => ( this.controls.envelope = self ) }
							/>

							<Volume
								heading="Volume"
								ref={ ( self ) => ( this.controls.volume = self ) }
							/>
						</Column>
					</Grid>
				</Wrapper>

				<div className="keyboard-keys">
					{ this.renderKeys() }
				</div>
			</div>
		);
	}
}

export default Keyboard;
