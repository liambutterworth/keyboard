import React     from 'react';
import PropTypes from 'prop-types';
import Tone      from 'tone';

class AmpEnvelope extends React.Component {
	constructor( props ) {
		super( props );

		this.ampEnvelope = new Tone.AmplitudeEnvelope({
			attack:  this.props.attack,
			decay:   this.props.decay,
			sustain: this.props.sustain,
			release: this.props.release,
		}).toMaster();
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
