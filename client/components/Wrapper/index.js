import React     from 'react';
import PropTypes from 'prop-types';

require( './style.css' );

const Wrapper = props => (
	<div className="wrapper">{ props.children }</div>
);

Wrapper.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Wrapper;
