import React   from 'react';
import Prompt  from 'components/Prompt';
import Actions from 'library/Actions';

require( './style.css' );

class Legend extends React.Component {

	constructor( props ) {

		super( props );

		Actions.add( [
			{ type: 'shortcut', char: '/', code: 191, desc: 'toggle legend' }
		] );

		this.handleAction = this.handleAction.bind( this );

	}

	componentWillMount() {

		document.addEventListener( 'action', this.handleAction );

	}

	componentWillUnmount() {

		document.removeEventListener( 'action', this.handleAction );

	}

	handleAction( event ) {

		switch ( event.detail.desc ) {

			case 'toggle legend':
				this.prompt.toggle();
				break;

		}

	}

	render() {

		return (
			<div className="legend">
				<Prompt ref={ ( prompt ) => ( this.prompt = prompt ) }>
					<h2>Legend</h2>
				</Prompt>
			</div>
		);

	}

}

export default Legend;
