import React     from 'react';
import PropTypes from 'prop-types';
import Tone      from 'tone';

import {
	Knob,
} from 'components/Form';

class Oscillator extends React.Component {

	constructor( props ) {

		super( props );

		this.type   = this.props.type;
		this.detune = this.props.detune;

	}

	get( pitch, node ) {

		return new Tone.Oscillator( {
			type:      this.type,
			detune:    this.detune,
			frequency: pitch,
		} ).connect( node );

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
