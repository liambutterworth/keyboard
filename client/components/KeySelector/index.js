import React  from 'react';
import Prompt from 'components/Prompt';

class KeySelector extends React.Component {

	render() {

		return (
			<div className="key-selector">
				<Prompt ref={ ( prompt ) => ( this.prompt = prompt ) }>
					<h2>Key Selector</h2>
				</Prompt>
			</div>
		);

	}
}

export default KeySelector;
