import React                    from 'react';
import PropTypes                from 'prop-types';
import MusicTheory              from 'music-theory';
import Grid, { Column }         from 'components/Grid';
import Form, { Button, Select } from 'components/Form';

class ScaleSelector extends React.Component {

	constructor( props ) {

		super( props );
		this.handleSubmit = this.handleSubmit.bind( this );

	}

	handleSubmit( event ) {

		event.preventDefault();
		if ( !this.props.set ) return;

		const form  = event.target;
		const root  = this.props.defineRoot ? form.root.value : '';
		const name  = form.scale.value;
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
					<Grid>
						{ this.props.defineRoot &&
							<Column span="3">
								<Select name="root" options={ rootOptions } defaultValue={ this.props.root } />
							</Column>
						}

						<Column span={ this.props.defineRoot ? '6' : '8' }>
							<Select name="scale" options={ scaleOptions } defaultValue={ this.props.scale } />
						</Column>

						<Column span={ this.props.defineRoot ? '3' : '4' }>
							<Button type="submit" text="Set" />
						</Column>
					</Grid>
				</Form>
			</div>
		);

	}

}

ScaleSelector.defaultProps = {
	defineRoot: true,
	root:       null,
	scale:      null,
	set:        null,
};

ScaleSelector.propTypes = {
	defineRoot: PropTypes.bool,
	root:       PropTypes.string,
	scale:      PropTypes.string,
	set:        PropTypes.func,
};

export default ScaleSelector;
