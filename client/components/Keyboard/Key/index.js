import React from 'react';

require( './style.css' );

class Key extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<div
				key={ this.props.index }
				className="keyboard-key"
				data-note={ this.props.note.symbol() }
				data-keybind={ this.props.keybind }
			/>
		);
	}
}

export default Key;
