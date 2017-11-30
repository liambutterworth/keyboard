import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';
import ShortID    from 'shortid';

require( './style.css' );

class Title extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			active: this.props.active,
		};

		this.handleClick = this.handleClick.bind( this );

	}

	handleClick( event ) {

		this.props.showTab( this.props.index );

	}

	activate() {

		if ( !this.state.active ) this.setState( { active: true } );

	}

	deactivate() {

		if ( this.state.active ) this.setState( { active: false } );

	}

	render() {

		const classNames = ClassNames({
			'tabs-title':         true,
			'tabs-title--active': this.state.active,
		});

		return (
			<li className={ classNames } onClick={ this.handleClick }>
				{ this.props.text }
			</li>
		);

	}

}

Title.defaultProps = {
	active: false,
};

Title.propTypes = {
	active: PropTypes.bool,
	text:   PropTypes.string.isRequired,
}

export default Title;
