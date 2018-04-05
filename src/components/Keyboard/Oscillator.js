//
// Oscillator
//
// :: Constructor
// :: CRUD Methods
// :: Event Handlers
// :: Render
// :: Properties

import React      from 'react';
import PropTypes  from 'prop-types';
import Tone       from 'tone';
import ShortID    from 'shortid';
import { Select } from 'components/Form';

class Oscillator extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );

		this.instances            = [];
		this.type                 = this.props.type;
		this.detune               = this.props.detune;
		this.handleOctaveChange   = this.handleOctaveChange.bind( this );
		this.handleDetuneChange   = this.handleDetuneChange.bind( this );
		this.handleWaveformChange = this.handleWaveformChange.bind( this );
	}

	//
	// CRUD Methods
	//

	create( frequency ) {
		const oscillator = new Tone.Oscillator({
			type:      this.type,
			detune:    this.detune,
			frequency: frequency,
		});

		oscillator.frequency.reference = frequency;
		this.instances.push( oscillator );
		return oscillator;
	}

	//
	// Event Handlers
	//

	handleOctaveChange( value ) {
		const factor = Math.abs( value ) * 2 || 1; // if 0 set to 1

		this.instances.forEach(( instance ) => {
			const frequency = instance.frequency.reference;
			instance.frequency.value = value > 0 ? frequency * factor : frequency / factor;
		});
	}

	handleDetuneChange( value ) {
		this.instances.forEach(( instance ) => {
			instance.detune.value = value * 100;
		});
	}

	handleWaveformChange( value ) {
		this.instances.forEach(( instance ) => {
			instance.type = value;
		});
	}

	//
	// Render
	//

	render() {
		return (
			<div>
				<h4>{ this.props.heading }</h4>

				<Select
					name="octave"
					label="Octave"
					returnType="number"
					defaultValue="0"
					onChange={ this.handleOctaveChange }
					options={[
						{ label: '-2', value: '-2' },
						{ label: '-1', value: '-1' },
						{ label: '0',  value: '0'  },
						{ label: '+1', value: '+1' },
						{ label: '+2', value: '+2' },
					]}
				/>

				<Select
					name="detune"
					label="Detune"
					returnType="number"
					defaultValue="0"
					onChange={ this.handleDetuneChange }
					options={[
						{ label: '-7', value: '-7' },
						{ label: '-6', value: '-6' },
						{ label: '-5', value: '-5' },
						{ label: '-4', value: '-4' },
						{ label: '-3', value: '-3' },
						{ label: '-2', value: '-2' },
						{ label: '-1', value: '-1' },
						{ label: '0',  value: '0'  },
						{ label: '+1', value: '+1' },
						{ label: '+2', value: '+2' },
						{ label: '+3', value: '+3' },
						{ label: '+4', value: '+4' },
						{ label: '+5', value: '+5' },
						{ label: '+6', value: '+6' },
						{ label: '+7', value: '+7' },
					]}
				/>

				<Select
					name="waveform"
					label="Waveform"
					defaultValue="0"
					onChange={ this.handleWaveformChange }
					options={[
						{ label: 'Sine',     value: 'sine'     },
						{ label: 'Square',   value: 'square'   },
						{ label: 'Sawtooth', value: 'sawtooth' },
						{ label: 'Triangle', value: 'triangle' },
					]}
				/>
			</div>
		);
	}

}

//
// Properties
//

Oscillator.defaultProps = {
	type:   'sine',
	detune: 0,
};

Oscillator.propTypes = {
	heading: PropTypes.string.isRequired,
	type:    PropTypes.string,
	detune:  PropTypes.number,
};

export default Oscillator;
