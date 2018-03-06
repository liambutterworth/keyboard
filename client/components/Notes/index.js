//
// Notes
//
// :: Constructor
// :: Event Handlers
// :: Render

import React            from 'react';
import PropTypes        from 'prop-types';
import Theory           from 'music-theory';
import ShortID          from 'shortid';
import ClassNames       from 'classnames';
import Grid, { Column } from 'components/Grid';

require( './style.css' );

class Notes extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );

		this.state = {
			root: false,
		};

		this.handleNoteClick  = this.handleNoteClick.bind( this );
		this.handleChordClick = this.handleChordClick.bind( this );
	}

	//
	// Event Handlers
	//

	handleNoteClick( event ) {
		const root = event.target.dataset.value;
		this.setState({ root: root })
	}

	handleChordClick( event ) {
		const chord = event.target.dataset.value;
		this.setState({ chord: chord });
	}

	//
	// Render
	//

	renderDisplay() {
		const text = `${ this.state.root || '' }${ this.state.chord || '' }`;
		return ( <div className="notes__display">{ text }</div> );
	}

	renderFifth( note, degree ) {
		const classNames = ClassNames({
			'notes__fifth':                  true,
			[ `notes__fifth--${ degree }` ]: true,
			'notes--selected':               this.state.root === note,
		});

		return ( <li
			key        = { ShortID.generate() }
			className  = { classNames }
			data-value = { note }
			onClick    = { this.handleNoteClick }
		>{ note }</li> );
	}

	renderCircleOfFifths() {
		const notes = [ 'C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F' ];
		const items = notes.map(( note, index ) => ( this.renderFifth( note, index * 30 ) ))
		return ( <ul className="notes__circle-of-fifths">{ items }</ul> );
	}

	renderChordCell( quality, extension ) {
		const chord = `${ quality }${ extension }`;

		const classNames = ClassNames({
			'notes__chord-cell': true,
			'notes--selected':   this.state.chord === chord,
		});

		if ( chord ) return ( <li
			key        = { ShortID.generate() }
			className  = { classNames }
			data-value = { chord }
			onClick    = { this.handleChordClick }
		>{ extension || quality }</li> );
	}

	renderChordRow( qualities, extensions ) {
		return qualities.map(( quality ) => {
			const items = extensions.map(( extension ) => (
				this.renderChordCell( quality, extension )
			));

			return( <ul key={ ShortID.generate() } className="notes__chord-row">{ items }</ul> );
		});
	}

	renderChordTable() {
		const qualities  = [ 'maj', '', 'm', 'dim', 'aug' ];
		const extensions = [ '', 7, 9, 11, 13 ];
		return ( <div className="notes__chord-table">{ this.renderChordRow( qualities, extensions ) }</div> );
	}

	render() {
		return (
			<div className="notes">
				<div className="notes__root">
					{ this.renderDisplay() }
					{ this.renderCircleOfFifths() }
				</div>

				<div className="notes__chord">
					{ this.renderChordTable() }
				</div>
			</div>
		);
	}
}

export default Notes;
