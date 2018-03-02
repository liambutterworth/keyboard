//
// Notes
//
// :: Constructor
// :: Render
// :: Properties

import React from 'react';
import PropTypes from 'prop-types';
import Theory from 'music-theory';

class Notes extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );

		// const notes = Theory.Note.all();
		// const rootOptions = MusicTheory.Note.all().map(( name ) => ({ label: name, value: name }));

		const notes = [
			'C',
			'C#', 'Db',
			'D',
			'D#', 'Eb',
			'E',
			'F',
			'F#', 'Gb',
			'G',
			'G#', 'Ab',
			'A',
			'A#', 'Bb',
			'B',
		];

		console.log( notes );
	}

	//
	// Render
	//

	render() {
		return (
			<div>
				Notes
			</div>
		);
	}
}

//
// Properties
//

Notes.defaultProps = {

};

Notes.defaultProps = {

};

export default Notes;
