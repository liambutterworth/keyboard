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
import ShortID          from 'shortid';
import keysSVG          from 'assets/icons/keys.svg';
import notesSVG         from 'assets/icons/notes.svg';
import Notes            from 'components/Notes';
import Grid, { Column } from 'components/Grid';
import Tabs, { Tab }    from 'components/Tabs';
import Wrapper          from 'components/Wrapper';
import { Select }       from 'components/Form';
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

		this.state = {
			tooltip: 'char',
		};

		this.controls            = {};
		this.keys                = [];
		this.handleAction        = this.handleAction.bind( this );
		this.handleNotesChange   = this.handleNotesChange.bind( this );
		this.handleTooltipChange = this.handleTooltipChange.bind( this );

		Actions.add([
			{ type: 'input', char: 'z', code: 90, desc: 'toggle key', note: 'C' },
			{ type: 'input', char: 's', code: 83, desc: 'toggle key', note: 'Db' },
			{ type: 'input', char: 'x', code: 88, desc: 'toggle key', note: 'D' },
			{ type: 'input', char: 'd', code: 68, desc: 'toggle key', note: 'Eb' },
			{ type: 'input', char: 'c', code: 67, desc: 'toggle key', note: 'E' },
			{ type: 'input', char: 'v', code: 86, desc: 'toggle key', note: 'F' },
			{ type: 'input', char: 'g', code: 71, desc: 'toggle key', note: 'Gb' },
			{ type: 'input', char: 'b', code: 66, desc: 'toggle key', note: 'G' },
			{ type: 'input', char: 'h', code: 72, desc: 'toggle key', note: 'Ab' },
			{ type: 'input', char: 'n', code: 78, desc: 'toggle key', note: 'A' },
			{ type: 'input', char: 'j', code: 74, desc: 'toggle key', note: 'Bb' },
			{ type: 'input', char: 'm', code: 77, desc: 'toggle key', note: 'B' },
			{ type: 'input', char: 'q', code: 81, desc: 'toggle key', note: 'C' },
			{ type: 'input', char: '2', code: 50, desc: 'toggle key', note: 'Db' },
			{ type: 'input', char: 'w', code: 87, desc: 'toggle key', note: 'D' },
			{ type: 'input', char: '3', code: 51, desc: 'toggle key', note: 'Eb' },
			{ type: 'input', char: 'e', code: 69, desc: 'toggle key', note: 'E' },
			{ type: 'input', char: 'r', code: 82, desc: 'toggle key', note: 'F' },
			{ type: 'input', char: '5', code: 53, desc: 'toggle key', note: 'Gb' },
			{ type: 'input', char: 't', code: 84, desc: 'toggle key', note: 'G' },
			{ type: 'input', char: '6', code: 54, desc: 'toggle key', note: 'Ab' },
			{ type: 'input', char: 'y', code: 89, desc: 'toggle key', note: 'A' },
			{ type: 'input', char: '7', code: 55, desc: 'toggle key', note: 'Bb' },
			{ type: 'input', char: 'u', code: 85, desc: 'toggle key', note: 'B' },
			{ type: 'input', char: 'i', code: 73, desc: 'toggle key', note: 'C' },
			{ type: 'input', char: '9', code: 57, desc: 'toggle key', note: 'Db' },
			{ type: 'input', char: 'o', code: 79, desc: 'toggle key', note: 'D' },
			{ type: 'input', char: '0', code: 48, desc: 'toggle key', note: 'Eb' },
			{ type: 'input', char: 'p', code: 80, desc: 'toggle key', note: 'E' },
		]);
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
		return this.keys.find(( key ) => ( key.props.data.code === keyCode ));
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
		this.keys.forEach(( key ) => ( key.release()));
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

			if ( symbols.includes( symbol )) {
				key.highlight();
			} else {
				key.unhighlight();
			}
		});
	}

	handleTooltipChange( tooltip ) {
		this.keys.forEach(( key ) => ( key.changeTooltip( tooltip )));
	}

	//
	// Render Methods
	//

	renderKeys() {
		let octave = 3;

		return Actions.all( 'input' ).map(( key, index ) => {
			const component = (
				<Key
					key={ ShortID.generate() }
					data={ key }
					octave={ octave }
					tooltip={ this.state.tooltip }
					controls={ this.controls }
					ref={ ( self ) => ( this.keys[index] = self ) }
				/>
			);

			if (( index + 1 ) % 12 === 0 ) octave += 1;
			return component;
		});
	}

	render() {
		return (
			<div className="keyboard">
				<div className="keyboard__controls">
					<Wrapper>
						<Tabs>
							<Tab title="Synth" icon={ keysSVG }>
								<Grid>
									<Column span="4">
										<Oscillator
											heading="Oscillator 1"
											ref={ ( self ) => ( this.controls.oscillator1 = self ) }
										/>

										<Oscillator
											heading="Oscillator 2"
											ref={ ( self ) => ( this.controls.oscillator2 = self ) }
										/>
									</Column>

									<Column span="4">
										<Filter
											heading="Filter"
											ref={ ( self ) => ( this.controls.filter = self ) }
										/>
									</Column>

									<Column span="4">
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
							</Tab>

							<Tab title="Notes" icon={ notesSVG }>
								<Notes onChange={ this.handleNotesChange } />
							</Tab>
						</Tabs>
					</Wrapper>
				</div>

				<div className="keyboard__toolbar">
					<Wrapper>
						<Grid>
							<Column span="4" offset="4">
								<Select
									name="tooltip"
									defaultValue="char"
									onChange={ this.handleTooltipChange }
									options={ [
										{ label: 'Keys', value: 'char' },
										{ label: 'Notes', value: 'note' },
									] }
								/>
							</Column>
						</Grid>
					</Wrapper>
				</div>

				<div className="keyboard__keys">
					{ this.renderKeys() }
				</div>
			</div>
		);
	}

}

export default Keyboard;
