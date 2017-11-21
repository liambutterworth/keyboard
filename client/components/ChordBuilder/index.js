import React  from 'react';
import Prompt from 'components/Prompt';

class ChordBuilder extends React.Component {

	render() {

		return (
			<div className="chord-builder">
				<Prompt ref={ ( prompt ) => ( this.prompt = prompt ) }>
					<h2>Chord Builder</h2>
				</Prompt>
			</div>
		);

	}
}

export default ChordBuilder;
