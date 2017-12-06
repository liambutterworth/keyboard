import React       from 'react';
import PropTypes   from 'prop-types';
import Prompt      from 'components/Prompt';
import MusicTheory from 'music-theory';

import Form, {
	Button,
	Select
} from 'components/Form';

class ScaleSelector extends React.Component {

	constructor( props ) {

		super( props );

		this.handleSubmit = this.handleSubmit.bind( this );

	}

	handleSubmit( event ) {

		event.preventDefault();
		if ( !this.props.set ) return;

		const form  = event.target;
		const root  = form['root'].value;
		const name  = form['scale'].value;
		const scale = new MusicTheory.Scale( name, root );

		this.props.set( scale );

	}

	render() {

		const rootOptions  = MusicTheory.Note.all().map( ( name ) => ( { label: name, value: name } ) );
		const scaleOptions = MusicTheory.Scale.names().map( ( name ) => ( { label: name, value: name } ) );

		return (
			<div className="scale-selector">
				<h2>Scale Selector</h2>

				<Form onSubmit={ this.handleSubmit }>
					<Select
						name="root"
						options={ rootOptions }
						defaultValue={ this.props.root }
					/>

					<Select
						name="scale"
						options={ scaleOptions }
						defaultValue={ this.props.scale }
					/>

					<Button type="submit" text="Set" />
				</Form>
			</div>
		);

	}

}

ScaleSelector.defaultProps = {
	root:  null,
	scale: null,
	set:   null,
};

ScaleSelector.propTypes = {
	root:  PropTypes.string,
	scale: PropTypes.string,
	set:   PropTypes.func,
};

export default ScaleSelector;
