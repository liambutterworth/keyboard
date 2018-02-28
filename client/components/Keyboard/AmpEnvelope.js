import React     from 'react';
import PropTypes from 'prop-types';
import Tone      from 'tone';

class AmpEnvelope extends React.Component {
	constructor( props ) {
		super( props );

		this.instances = [];
		this.attack    = this.props.attack;
		this.decay     = this.props.decay;
		this.sustain   = this.props.sustain;
		this.release   = this.props.release;
	}

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

	render() {
		return (
			<div>
				<h4>AmpEnvelope</h4>
			</div>
		)
	}
}

AmpEnvelope.defaults = {
	attack:  0.1,
	decay:   0.2,
	sustain: 1,
	release: 0.8,
};

AmpEnvelope.PropTypes = {
	attack:  PropTypes.number,
	decay:   PropTypes.number,
	sustain: PropTypes.number,
	release: PropTypes.number,
}

export default AmpEnvelope;
