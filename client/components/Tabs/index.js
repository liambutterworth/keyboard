import React     from 'react';
import PropTypes from 'prop-types';
import Tab       from './Tab';

class Tabs extends React.Component {

	render() {

		return (
			<div className="tabs">
				{ this.props.children }
			</div>
		);

	}

}

Tabs.propTypes = {
	children: PropTypes.node,
};

export default Tabs;
export { Tab };
