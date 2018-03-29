//
// Notes
//
// :: Constructor
// :: Component Methods
// :: Event Handlers
// :: Render
// :: Properties

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
			root:  '',
			chord: '',
		};

		this.handleNoteClick  = this.handleNoteClick.bind( this );
		this.handleChordClick = this.handleChordClick.bind( this );
	}

	//
	// Component Methods
	//

	componentDidUpdate() {
		if ( this.state.root && this.state.chord ) {
			const chord = new Theory.Chord( `${ this.state.root }${ this.state.chord }` );
			this.props.onChange( chord, chord.notes );
		} else if ( this.state.root ) {
			const note = new Theory.Note( this.state.root );
			this.props.onChange( note, new Theory.Note.Collection([ note ]) );
		} else {
			this.props.onChange( null, new Theory.Note.Collection() );
		}
	}

	//
	// Event Handlers
	//

	handleNoteClick( event ) {
		const root = event.target.dataset.value;

		if ( root === this.state.root ) {
			this.setState({ root: '' });
		} else {
			this.setState({ root: root });
		}
	}

	handleChordClick( event ) {
		const chord = event.target.dataset.value;

		if ( chord === this.state.chord ) {
			this.setState({ chord: '' });
		} else {
			this.setState({ chord: chord });
		}
	}

	//
	// Render
	//

	renderDisplay() {
		const text = `${ this.state.root || '' }${ this.state.chord || '' }`;
		return ( <div className="notes__display">{ text }</div> );
	}

	renderFifth( note, degree ) {
		const key      = ShortID.generate();
		const callback = this.handleNoteClick;

		const classNames = ClassNames({
			'notes__fifth':                  true,
			[ `notes__fifth--${ degree }` ]: true,
			'notes--selected':               this.state.root === note,
		});

		return ( <li key= { key } className= { classNames } data-value= { note } onClick= { callback }>{ note }</li> );
	}

	renderCircleOfFifths() {
		const notes = [ 'C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F' ];
		const items = notes.map(( note, index ) => ( this.renderFifth( note, index * 30 ) ))
		return ( <ul className="notes__circle-of-fifths">{ items }</ul> );
	}

	renderChordCell( quality, extension ) {
		const chord    = `${ quality }${ extension }`;
		const key      = ShortID.generate();
		const text     = extension || quality;
		const callback = this.handleChordClick;

		const classNames = ClassNames({
			'notes__chord-cell': true,
			'notes--selected':   this.state.chord === chord,
		});

		if ( chord ) {
			return ( <li key={ key } className={ classNames } data-value={ chord } onClick={ callback } >{ text }</li> );
		} else {
			return ( <li key={ key } className={ classNames } /> );
		}
	}

	renderChordRow( row ) {
		const items = row.map(( cell, index ) => ( this.renderChordCell( row[0], index === 0 ? '' : row[index] ) ));
		return ( <ul key={ ShortID.generate() } className="notes__chord-row">{ items }</ul> );
	}

	renderChordTable() {
		const rows = [
			[ 'maj', 7, 9, 11, 13 ],
			[ '',    7, 9, 11, 13 ],
			[ 'm',   7, 9, 11, 13 ],
			[ 'dim', 7 ],
			[ 'aug', 7 ],
		];

		const lists = rows.map(( row ) => ( this.renderChordRow( row ) ));
		return ( <div className="notes__chord-table">{ lists }</div> );
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

//
// Properties
//

Notes.defaultProps = {
	onChange: function() {},
};

Notes.propTypes = {
	onChange: PropTypes.func,
};

export default Notes;
