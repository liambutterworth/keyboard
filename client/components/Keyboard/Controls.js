import React            from 'react';
import PropTypes        from 'prop-types';
import Tone             from 'tone'
import Wrapper          from 'components/Wrapper';
import Grid, { Column } from 'components/Grid';

import {
	Checkboxes,
	Radios,
	Select,
	Knob,
} from 'components/Form';

class Controls extends React.Component {

	constructor( props ) {

		super( props );

		// this.setVolume = this.setVolume.bind( this );

		// this.setVolume( this.props.volume );

		// console.log( this.props.synth );
		// const lfo = new Tone.LFO( '4n', 400, 4000 );
		// lfo.connect( this.props.synth.volume ).start();

	}

	setVolume( value ) {

		this.props.synth.set( 'volume', value );

	}

	render() {

		return (
			<Wrapper>
				<Grid>
					<Column span="3">Foo</Column>
					<Column span="3">Bar</Column>
					<Column span="3">Baz</Column>

					<Column span="3">
						<div className="keyboard-controls">
							<Knob
								name="volume"
								label="Volume"
								min={ -80 }
								max={ 40 }
								value={ this.props.volume }
								onChange={ this.setVolume }
							/>
						</div>
					</Column>
				</Grid>
			</Wrapper>
		);

	}

}

Controls.defaultProps = {
	volume: -20,
};

Controls.propTypes = {
	synth:  PropTypes.object,
	volume: PropTypes.number,
};

export default Controls;
