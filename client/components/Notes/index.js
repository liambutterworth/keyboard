//
// Notes
//
// :: Constructor
// :: Render
// :: Properties

import React     from 'react';
import PropTypes from 'prop-types';
import Theory    from 'music-theory';

require( './style.css' );

class Notes extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );
	}

	//
	// Render
	//

	render() {
		return (
			<div className="notes">
				<ul className="notes-circle">
					<li className="notes-circle-0"   data-value="C">C</li>
					<li className="notes-circle-30"  data-value="G">G</li>
					<li className="notes-circle-60"  data-value="D">D</li>
					<li className="notes-circle-90"  data-value="A">A</li>
					<li className="notes-circle-120" data-value="E">E</li>
					<li className="notes-circle-150" data-value="B">B</li>
					<li className="notes-circle-180" data-value="F#">F#</li>
					<li className="notes-circle-210" data-value="Db">Db</li>
					<li className="notes-circle-240" data-value="Ab">Ab</li>
					<li className="notes-circle-270" data-value="Eb">Eb</li>
					<li className="notes-circle-300" data-value="Bb">Bb</li>
					<li className="notes-circle-330" data-value="F">F</li>
				</ul>

				<table className="notes-chords">
					<tr>
						<td>maj</td>
						<td>7</td>
						<td>9</td>
						<td>11</td>
						<td>13</td>
					</tr>

					<tr>
						<td></td>
						<td>7</td>
						<td>9</td>
						<td>11</td>
						<td>13</td>
					</tr>

					<tr>
						<td>m</td>
						<td>7</td>
						<td>9</td>
						<td>11</td>
						<td>13</td>
					</tr>

					<tr>
						<td>dim</td>
						<td>7</td>
						<td>9</td>
						<td>11</td>
						<td>13</td>
					</tr>

					<tr>
						<td>dim</td>
						<td>7</td>
						<td>9</td>
						<td>11</td>
						<td>13</td>
					</tr>
				</table>
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
