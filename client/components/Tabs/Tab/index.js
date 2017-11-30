import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';
import ShortID    from 'shortid';

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

	handleClick( event ) {

		console.log( this.props.index );

	}

	render() {

		const classNames = ClassNames({
			'tabs-tab':       true,
			'tabs-tab--show': this.state.show,
		});

		return (
			<li className={ classNames }>
				{ this.props.children }
			</li>
		);

	}

}

Tab.defaultPropos = {
	open: false,
};

Tab.propTypes = {
	open:     PropTypes.bool,
	title:    PropTypes.string.isRequired,
	children: PropTypes.node,
};

export default Tab;
