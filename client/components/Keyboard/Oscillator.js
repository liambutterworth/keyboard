import React     from 'react';
import PropTypes from 'prop-types';
import Tone      from 'tone';

import {
	Knob,
} from 'components/Form';

class Oscillator extends React.Component {

	constructor( props ) {
		super( props );

		this.instances = [];
		this.type      = this.props.type;
		this.detune    = this.props.detune;
	}

	create( frequency ) {
		const oscillator = new Tone.Oscillator({
			type:      this.type,
			detune:    this.detune,
			frequency: frequency,
		});

		this.instances.push( oscillator );
		return oscillator;
	}

	render() {
		return (
			<div>
				<h4>Oscillator</h4>
			</div>
		);
	}

}

Oscillator.defaultProps = {
	type:   'sine',
	detune: 0,
};

Oscillator.propTypes = {
	type:   PropTypes.string,
	detune: PropTypes.number,
};

export default Oscillator;
