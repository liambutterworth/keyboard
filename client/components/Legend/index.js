import React     from 'react';
import PropTypes from 'prop-types';
import Prompt    from 'components/Prompt';

require( './style.css' );

class Legend extends React.Component {

	constructor( props ) {

		super( props );
		this.handleShortcut = this.handleShortcut.bind( this );

	}

	componentWillMount() {

		document.addEventListener( 'shortcut', this.handleShortcut );

	}

	componentWillUnmount() {

		document.removeEventListener( 'shortcut', this.handleShortcut );

	}

	handleShortcut( event ) {

		switch ( event.detail.action ) {

			case 'close prompt':
				this.prompt.close();
				break;

			case 'toggle legend':
				this.prompt.toggle();
				break;

		}

	}

	render() {

		return (
			<div className="legend">
				<Prompt
					ref={ ( prompt ) => ( this.prompt = prompt ) }
				/>
			</div>
		);

	}

}

Legend.defaultProps = {
	open: false,
};

Legend.propTypes = {
	open: PropTypes.bool,
};

export default Legend;
