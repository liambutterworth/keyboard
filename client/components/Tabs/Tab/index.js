import React     from 'react';
import PropTypes from 'prop-types';

class Tab extends React.Component {

	render() {

		return (
			<div className="tabs-tab">
				{ this.props.children }
			</div>
		);

	}

}

Tab.propTypes = {
	title:    PropTypes.string,
	children: PropTypes.node,
};

export default Tab;
