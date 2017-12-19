import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';

require( './style.css' );

class Title extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			active: this.props.active,
		};

		this.handleClick = this.handleClick.bind( this );

	}

	handleClick() {

		this.props.showTab( this.props.index );

	}

	activate() {

		if ( !this.state.active ) this.setState( { active: true } );

	}

	deactivate() {

		if ( this.state.active ) this.setState( { active: false } );

	}

	render() {

		const classNames = ClassNames( {
			'tabs-title':         true,
			'tabs-title--active': this.state.active,
		} );

		return (
			<button className={ classNames } onClick={ this.handleClick }>
				{ this.props.text }
			</button>
		);

	}

}

Title.defaultProps = {
	active: false,
};

Title.propTypes = {
	text:    PropTypes.string.isRequired,
	index:   PropTypes.number.isRequired,
	showTab: PropTypes.func.isRequired,
	active:  PropTypes.bool,
};

export default Title;
