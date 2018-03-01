//
// Amp Envelope
//
// :: Constructor
// :: CRUD Methods
// :: Event Handlers
// :: Render
// :: Properties

import React     from 'react';
import PropTypes from 'prop-types';
import Tone      from 'tone';
import { Knob }  from 'components/Form';

class AmpEnvelope extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );

		this.instances           = [];
		this.attack              = this.props.attack;
		this.decay               = this.props.decay;
		this.sustain             = this.props.sustain;
		this.release             = this.props.release;
		this.handleAttackChange  = this.handleAttackChange.bind( this );
		this.handleDecayChange   = this.handleAttackChange.bind( this );
		this.handleSustainChange = this.handleAttackChange.bind( this );
		this.handleReleaseChange = this.handleAttackChange.bind( this );
	}

	//
	// CRUD Methods
	//

	create() {
		const ampEnvelope = new Tone.AmplitudeEnvelope({
			attack:  this.attack,
			decay:   this.decay,
			sustain: this.sustain,
			release: this.release,
		});

		this.instances.push( ampEnvelope );
		return ampEnvelope;
	}

	//
	// Event Handlers
	//

	handleAttackChange( value ) {
		this.attack = value;
		this.instances.forEach(( instance ) => ( instance.attack = this.attack ));
	}


	handleDecayChange( value ) {
		this.decay = value;
		this.instances.forEach(( instance ) => ( instance.decay = this.decay ));
	}

	handleSustainChange( value ) {
		this.sustain = value;
		this.instances.forEach(( instance ) => ( instance.sustain = this.sustain ));
	}

	handleReleaseChange( value ) {
		this.release = value;
		this.instances.forEach(( instance ) => ( instance.release = this.release ));
	}

	//
	// Render
	//

	render() {
		return (
			<div>
				<h4>{ this.props.heading }</h4>

				<Knob
					label="Attack"
					name="amp-envelope-attack"
					max={ 10 }
					value={ this.attack }
					onChange={ this.handleAttackChange }
				/>

				<Knob
					label="Decay"
					name="amp-envelope-decay"
					max={ 10 }
					value={ this.decay }
					onChange={ this.handleDecayChange }
				/>

				<Knob
					label="Sustain"
					name="amp-envelope-sustain"
					max={ 10 }
					value={ this.sustain }
					onChange={ this.handleSustainChange }
				/>

				<Knob
					label="Release"
					name="amp-envelope-release"
					max={ 10 }
					value={ this.release }
					onChange={ this.handleReleaseChange }
				/>
			</div>
		)
	}
}

//
// Properties
//

AmpEnvelope.defaultProps = {
	attack:  0.1,
	decay:   0.2,
	sustain: 1,
	release: 0.8,
};

AmpEnvelope.PropTypes = {
	heading: PropTypes.string.isRequired,
	attack:  PropTypes.number,
	decay:   PropTypes.number,
	sustain: PropTypes.number,
	release: PropTypes.number,
}

export default AmpEnvelope;
