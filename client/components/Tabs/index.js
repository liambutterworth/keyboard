//
// Tabs
//
// :: Constructor
// :: State Methods
// :: Render
// :: Properties

import React     from 'react';
import PropTypes from 'prop-types';
import ShortID   from 'shortid';
import Title     from './Title';
import Tab       from './Tab';

// <Tabs>
// 	<Tab title="foo"></Tab>
// 	<Tab title="bar"></Tab>
// </Tabs>

require( './style.css' );

class Tabs extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );

		this.titles  = [];
		this.tabs    = [];
		this.showTab = this.showTab.bind( this );
	}

	//
	// State Methods

	showTab( index ) {
		this.titles.forEach( ( title, titleIndex ) => {
			if ( titleIndex === index ) title.activate(); else title.deactivate();
		} );

		this.tabs.forEach( ( tab, tabIndex ) => {
			if ( tabIndex === index ) tab.show(); else tab.hide();
		} );
	}

	//
	// Render
	//

	render() {
		const titles = [];
		const tabs   = [];

		React.Children.forEach( this.props.children, ( child, index ) => {
			titles.push( <Title
				key={ ShortID.generate() }
				text={ child.props.title }
				index={ index }
				active={ index === 0 }
				showTab={ this.showTab }
				ref={ ( self ) => ( this.titles[index] = self ) }
			/> );

			tabs.push( React.cloneElement( child, {
				key:   ShortID.generate(),
				index: index,
				show:  index === 0,
				ref:   ( self ) => ( this.tabs[index] = self ),
			} ) );
		} );

		return (
			<div className="tabs">
				<header className="tabs__titles">{ titles }</header>
				<ul className="tabs__content">{ tabs }</ul>
			</div>
		);
	}
}

//
// Properties
//

Tabs.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Tabs;
export { Tab };
