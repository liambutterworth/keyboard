import React from 'react';

require( './style.css' );

class Key extends React.Component {
	render() {
		return (
			<div className="keyboard-key" onKeyPress={ this.keypress }>
				{ this.props.note.symbol() }
			</div>
		);
	}
}

export default Key;
