import React  from 'react';
import Prompt from 'components/Prompt';

class ScaleSelector extends React.Component {

	render() {

		return (
			<div className="scale-selector">
				<Prompt ref={ ( prompt ) => ( this.prompt = prompt ) }>
					<h2>Scale Selector</h2>
				</Prompt>
			</div>
		);

	}
}

export default ScaleSelector;
