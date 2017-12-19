import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';

require( './style.css' );

class Tab extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			show: props.show,
		};

	}

	show() {

		if ( !this.state.show ) this.setState( { show: true } );

	}

	hide() {

		if ( this.state.show ) this.setState( { show: false } );

	}

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

Tab.defaultProps = {
	children: null,
	show:     false,
};

Tab.propTypes = {
	children: PropTypes.node,
	show:     PropTypes.bool,
};

export default Tab;
