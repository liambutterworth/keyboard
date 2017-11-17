import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';

require( './style.css' );

class Prompt extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			open: props.open,
		};
	}

	open() {
		this.setState( { open: true } );
	}

	close() {
		this.setState( { open: false } );
	}

	toggle() {
		this.setState( { open: !this.state.open } );
	}

	render() {
		const classNames = ClassNames( {
			'keyboard-prompt':       true,
			'keyboard-prompt--open': this.state.open,
		} );

		return (
			<div className={ classNames } />
		);
	}
}

Prompt.defaultProps = {
	open: false,
};

Prompt.propTypes = {
	open: PropTypes.bool,
};

export default Prompt;
