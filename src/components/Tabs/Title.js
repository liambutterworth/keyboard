//
// Title
//
// :: Constructor
// :: Event Methods
// :: State Methods
// :: Render
// :: Properties

import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';
import Icon       from 'components/Icon';

class Title extends React.Component {

	//
	// Constructor
	//

	constructor( props ) {
		super( props );

		this.state = {
			active: this.props.active,
		};

		this.handleClick = this.handleClick.bind( this );
	}

	//
	// Event Methods
	//

	handleClick() {
		this.props.showTab( this.props.index );
	}

	//
	// State Methods
	//

	activate() {
		if ( !this.state.active ) this.setState({ active: true });
	}

	deactivate() {
		if ( this.state.active ) this.setState({ active: false });
	}

	//
	// Render
	//

	render() {
		const classNames = ClassNames({
			tabs__title:           true,
			'tabs__title--active': this.state.active,
		});

		return (
			<button className={ classNames } onClick={ this.handleClick }>
				<Icon svg={ this.props.icon } />
				{/* this.props.text */}
			</button>
		);
	}

}

//
// Properties
//

Title.defaultProps = {
	active: false,
	icon:   '',
};

Title.propTypes = {
	text:    PropTypes.string.isRequired,
	index:   PropTypes.number.isRequired,
	showTab: PropTypes.func.isRequired,
	icon:    PropTypes.string,
	active:  PropTypes.bool,
};

export default Title;
