//
// Tab
//
// :: Constructor
// :: State Methods
// :: Render
// :: Properties

import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';

class Tab extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );

		this.state = {
			show: props.show,
		};
	}

	//
	// State Methods
	//

	show() {
		if ( !this.state.show ) this.setState( { show: true } );
	}

	hide() {
		if ( this.state.show ) this.setState( { show: false } );
	}

	//
	// Render
	//

	render() {
		const classNames = ClassNames( {
			'tabs-tab':       true,
			'tabs-tab--show': this.state.show,
		} );

		return (
			<li className={ classNames }>
				{ this.props.children }
			</li>
		);
	}
}

//
// Properties
//

Tab.defaultProps = {
	children: null,
	show:     false,
};

Tab.propTypes = {
	children: PropTypes.node,
	show:     PropTypes.bool,
};

export default Tab;
