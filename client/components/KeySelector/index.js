import React                    from 'react';
import PropTypes                from 'prop-types';
import MusicTheory              from 'music-theory';
import Grid, { Column }         from 'components/Grid';
import Form, { Button, Select } from 'components/Form';

class KeySelector extends React.Component {

	constructor( props ) {

		super( props );
		this.handleSubmit = this.handleSubmit.bind( this );

	}

	handleSubmit( event ) {

		event.preventDefault();
		if ( !this.props.set ) return;

		const form = event.target;
		const root = form.form.value;
		const key  = new MusicTheory.Key( root );

		this.props.set( key );

	}

	render() {

		const rootOptions = MusicTheory.Note.all().map( ( name ) => ( { label: name, value: name } ) );

		return (
			<div className="key-selector">
				<h2>Key Selector</h2>

				<Form onSubmit={ this.handleSubmit }>
					<Grid>
						<Column span="8">
							<Select name="root" options={ rootOptions } defaultValue={ this.props.root } />
						</Column>

						<Column span="4">
							<Button type="submit" text="Set" />
						</Column>
					</Grid>
				</Form>
			</div>
		);

	}

}

KeySelector.defaultProps = {
	root: null,
	set:  null,
};

KeySelector.propTypes = {
	root: PropTypes.string,
	set:  PropTypes.func,
};

export default KeySelector;
