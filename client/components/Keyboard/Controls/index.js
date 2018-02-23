import React     from 'react';
import PropTypes from 'prop-types';

import {
	Checkboxes,
	Radios,
	Select,
	Knob,
} from 'components/Form';

require( './style.css' );

class Controls extends React.Component {

	constructor( props ) {

		super( props );

		this.setVolume = this.setVolume.bind( this );

		this.setVolume( this.props.volume );

	}

	setVolume( value ) {

		this.props.synth.set( 'volume', value );

	}

	render() {

		return (
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
