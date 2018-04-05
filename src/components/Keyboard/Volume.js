//
// Volume
//
// :: Constructor
// :: Get
// :: Event Handlers
// :: Render
// :: Properties

import React     from 'react';
import PropTypes from 'prop-types';
import Tone      from 'tone';
import { Knob }  from 'components/Form';

class Volume extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );

		this.instance       = new Tone.Volume( this.props.volume );
		this.volume         = this.props.volume;
		this.onVolumeChange = this.onVolumeChange.bind( this );
	}

	//
	// Event Handlers
	//

	onVolumeChange( value ) {
		this.volume = parseInt( value, 10 );
		this.instance.volume.value = this.volume;
	}

	//
	// Get
	//

	get() {
		return this.instance;
	}

	//
	// Render
	//

	render() {
		return (
			<div>
				<Knob
					label="Volume"
					name="volume"
					min={ -50 }
					max={ 20 }
					value={ this.volume }
					onChange={ this.onVolumeChange }
				/>
			</div>
		);
	}

}

//
// Properties
//

Volume.defaultProps = {
	volume: -15,
};

Volume.propTypes = {
	volume: PropTypes.number,
};

export default Volume;
