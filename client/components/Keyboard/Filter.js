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
	Select,
	Counter,
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
		this.octave                = this.props.octave;
		this.handleTypeChange      = this.handleTypeChange.bind( this );
		this.handleCutoffChange    = this.handleCutoffChange.bind( this );
		this.handleRolloffChange   = this.handleRolloffChange.bind( this );
		this.handleResonanceChange = this.handleResonanceChange.bind( this );
		this.handleAttackChange    = this.handleAttackChange.bind( this );
		this.handleDecayChange     = this.handleDecayChange.bind( this );
		this.handleSustainChange   = this.handleSustainChange.bind( this );
		this.handleReleaseChange   = this.handleReleaseChange.bind( this );
		this.handleOctaveChange    = this.handleOctaveChange.bind( this );
	}

	//
	// CRUD Methods
	//

	create( frequency ) {
		const filter = new Tone.Filter({
			type:      this.type,
			frequency: this.cutoff,
			rolloff:   this.rolloff,
			Q:         this.resonance,
		});

		filter.envelope = new Tone.FrequencyEnvelope({
			attack:        this.attack,
			decay:         this.decay,
			sustain:       this.sustain,
			release:       this.release,
			octaves:       this.octave,
			baseFrequency: frequency,
		});

		filter.envelope.connect( filter.frequency );

		this.instances.push( filter );
		return filter;
	}

	//
	// Event Handlers
	//

	handleTypeChange( value ) {
		this.type = value;
		this.instances.forEach(( instance ) => ( instance.type = this.type ));
	}

	handleCutoffChange( value ) {
		this.cutoff = value;
		this.instances.forEach(( instance ) => ( instance.frequency.value = this.cutoff ));
	}

	handleRolloffChange( value ) {
		this.rolloff = value;
		this.instances.forEach(( instance ) => ( instance.rolloff = this.rolloff ));
	}

	handleResonanceChange( value ) {
		this.resonance = value;

		this.instances.forEach(( instance ) => {
			instance.Q.value = this.resonance
		});
	}

	handleAttackChange( value ) {
		this.attack = value;
		this.instances.forEach(( instance ) => ( instance.envelope.attack = this.attack ));
	}

	handleDecayChange( value ) {
		this.decay = value;
		this.instances.forEach(( instance ) => ( instance.envelope.decay = this.decay ));
	}

	handleSustainChange( value ) {
		this.sustain = value;
		this.instances.forEach(( instance ) => ( instance.envelope.sustain = this.sustain ));
	}

	handleReleaseChange( value ) {
		this.release = value;
		this.instances.forEach(( instance ) => ( instance.envelope.release = this.release ));
	}

	handleOctaveChange( value ) {
		this.octave = value;
		this.instances.forEach(( instance ) => ( instance.envelope.octave = this.octave ));
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

							<Select
								name="rolloff"
								returnType="number"
								defaultValue={ this.rolloff }
								onChange={ this.handleRolloffChange }
								options={[
									{ label: '-12', value: '-12' },
									{ label: '-24', value: '-24' },
									{ label: '-48', value: '-48' },
									{ label: '-96', value: '-96' },
								]}
							/>

							<Select
								name="type"
								defaultValue={ this.type }
								onChange={ this.handleTypeChange }
								options={[
									{ label: 'Lowpass',  value: 'lowpass' },
									{ label: 'Bandpass', value: 'bandpass' },
									{ label: 'Highpass', value: 'highpass' },
								]}
							/>

							<Counter
								label="Octave"
								name="ocatve"
								onChange={ this.handleOctaveChange }
								defaultValue={ this.octave }
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
	octave:    4,
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
	octave:    PropTypes.number,
};

export default Filter;
