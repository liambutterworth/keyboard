//
// Filter
//
// :: Constructor
// :: CRUD Methods
// :: Event Handlers
// :: Render
// :: Properties

import React     from 'react';
import PropTypes from 'prop-types';
import Tone      from 'tone';

import Grid, {
	Row,
	Column
} from 'components/Grid';

import {
	Knob,
	Select
} from 'components/Form';

class Filter extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );

		this.instances             = [];
		this.type                  = this.props.type;
		this.cutoff                = this.props.cutoff;
		this.rolloff               = this.props.rolloff;
		this.resonance             = this.props.resonance;
		this.attack                = this.props.attack;
		this.decay                 = this.props.decay;
		this.sustain               = this.props.sustain;
		this.release               = this.props.release;
		this.handleTypeChange      = this.handleTypeChange.bind( this );
		this.handleCutoffChange    = this.handleCutoffChange.bind( this );
		this.handleRolloffChange   = this.handleRolloffChange.bind( this );
		this.handleResonanceChange = this.handleResonanceChange.bind( this );
		this.handleAttackChange    = this.handleAttackChange.bind( this );
		this.handleDecayChange     = this.handleDecayChange.bind( this );
		this.handleSustainChange   = this.handleSustainChange.bind( this );
		this.handleReleaseChange   = this.handleReleaseChange.bind( this );
	}

	//
	// CRUD Methods
	//

	create() {
		const filter = new Tone.Filter({
			type:      this.type,
			frequency: this.cutoff,
			rolloff:   this.rolloff,
			Q:         this.resonance,
		});

		filter.envelope = new Tone.FrequencyEnvelope({
			attack:  this.attack,
			decay:   this.decay,
			sustain: this.sustain,
			release: this.release,
			baseFrequency: 220,
			octaves: 8,
		});

		filter.envelope.connect( filter.frequency );

		this.instances.push( filter );
		return filter;
	}

	//
	// Event Handlers
	//

	handleTypeChange( event ) {
		this.type = event.target.value;
		this.instances.forEach(( instance ) => ( instance.type = this.type ));
	}

	handleCutoffChange( value ) {
		this.cutoff = parseInt( value, 10 );
		this.instances.forEach(( instance ) => ( instance.frequency.value = this.cutoff ));
	}

	handleRolloffChange( event ) {
		this.rolloff = parseInt( event.target.value, 10 );
		this.instances.forEach(( instance ) => ( instance.rolloff = this.rolloff ));
	}

	handleResonanceChange( value ) {
		this.resonance = parseInt( value, 10 );

		this.instances.forEach(( instance ) => {
			instance.Q.value = this.resonance
		});
	}

	handleAttackChange( value ) {
		this.attack = parseInt( value, 10 );
		this.instances.forEach(( instance ) => ( instance.envelope.attack = this.attack ));
	}

	handleDecayChange( value ) {
		this.decay = parseInt( value, 10 );
		this.instances.forEach(( instance ) => ( instance.envelope.decay = this.decay ));
	}

	handleSustainChange( value ) {
		this.sustain = parseInt( value, 10 );
		this.instances.forEach(( instance ) => ( instance.envelope.sustain = this.sustain ));
	}

	handleReleaseChange( value ) {
		this.release = parseInt( value, 10 );
		this.instances.forEach(( instance ) => ( instance.envelope.release = this.release ));
	}

	//
	// Render
	//

	render() {
		return (
			<div>
				<h4>{ this.props.heading }</h4>

				<Grid>
					<Row>
						<Column span="12">
							<Knob
								label="Cutoff"
								name="cutoff"
								max={ 12000 }
								value={ this.cutoff }
								onChange={ this.handleCutoffChange }
							/>

							<Knob
								label="Resonance"
								name="resonance"
								max={ 20 }
								resistance={ 0.2 }
								value={ this.resonance }
								onChange={ this.handleResonanceChange }
							/>

							<Select
								name="rolloff"
								defaultValue={ '-12' }
								onChange={ this.handleRolloffChange }
								options={[
									{ label: '-12', value: '-12' },
									{ label: '-24', value: '-24' },
									{ label: '-48', value: '-48' },
									{ label: '-98', value: '-98' },
								]}
							/>

							<Select
								name="type"
								defaultValue={ 'lowpass' }
								onChange={ this.handleTypeChange }
								options={[
									{ label: 'Lowpass',  value: 'lowpass' },
									{ label: 'Bandpass', value: 'bandpass' },
									{ label: 'Highpass', value: 'highpass' },
								]}
							/>
						</Column>
					</Row>

					<Row>
						<Column span="12">
							<Knob
								label="Attack"
								name="filter-envelope-attack"
								max={ 10 }
								value={ this.attack }
								onChange={ this.handleAttackChange }
							/>

							<Knob
								label="Decay"
								name="filter-envelope-decay"
								max={ 10 }
								value={ this.decay }
								onChange={ this.handleDecayChange }
							/>

							<Knob
								label="Sustain"
								name="filter-envelope-sustain"
								max={ 10 }
								value={ this.sustain }
								onChange={ this.handleSustainChange }
							/>

							<Knob
								label="Release"
								name="filter-envelope-release"
								max={ 10 }
								value={ this.release }
								onChange={ this.handleReleaseChange }
							/>
						</Column>
					</Row>
				</Grid>
			</div>
		);
	}

}

//
// Properties
//

Filter.defaultProps = {
	type:      'lowpass',
	cutoff:    350,
	rolloff:   -12,
	resonance: 10,
	attack:    0.1,
	decay:     0.2,
	sustain:   1,
	release:   0.8,
};

Filter.propTypes = {
	heading:   PropTypes.string.isRequired,
	type:      PropTypes.string,
	cutoff:    PropTypes.number,
	rolloff:   PropTypes.number,
	resonance: PropTypes.number,
	attack:    PropTypes.number,
	decay:     PropTypes.number,
	sustain:   PropTypes.number,
	release:   PropTypes.number,
};

export default Filter;
