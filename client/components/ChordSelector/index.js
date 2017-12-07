import React       from 'react';
import PropTypes   from 'prop-types';
import MusicTheory from 'music-theory';

import Form, {
	Button,
	Select,
} from 'components/Form';

class ChordSelector extends React.Component {

	constructor( props ) {

		super( props );
		this.handleSubmit = this.handleSubmit.bind( this );

	}

	handleSubmit( event ) {

		event.preventDefault();
		if ( !this.props.set ) return;

		const form   = event.target;
		const root   = this.props.defineRoot ? form['root'].value : '';
		const symbol = form['chord'].value;
		const chord  = new MusicTheory.Chord( `${ root }${ symbol }` );

		this.props.set( chord );

	}

	render() {

		const rootOptions  = MusicTheory.Note.all().map( ( name ) => ( { label: name, value: name } ) );
		const chordOptions = MusicTheory.Chord.all().map( ( chord ) => ( { label: chord.name, value: chord.symbol } ) );

		return (
			<div className="chord-builder">
				<h2>Chord Selector</h2>

				<Form onSubmit={ this.handleSubmit }>
					{ this.props.defineRoot &&
						<Select
							name="root"
							options={ rootOptions }
							defaultValue={ this.props.root }
						/>
					}

					<Select
						name="chord"
						options={ chordOptions }
						defaultValue={ this.props.chord }
					/>

					<Button type="submit" text="Set" />
				</Form>
			</div>
		);

	}
}

ChordSelector.defaultProps = {
	defineRoot: true,
	root:       null,
	chord:      null,
	set:        null,
};

ChordSelector.propTypes = {
	defineRoot: PropTypes.bool,
	root:       PropTypes.string,
	chord:      PropTypes.string,
	set:        PropTypes.func,
};

export default ChordSelector;
