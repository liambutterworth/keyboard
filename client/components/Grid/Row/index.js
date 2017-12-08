import React from 'react';
import PropTypes from 'prop-types';

require( './style.css' );

const Row = ( props ) => {

	return (
		<div className="grid-row">
			{ props.children }
		</div>
	);

};

Row.defaultProps = {
	children: null,
};

Row.propTypes = {
	children: PropTypes.node,
};

export default Row;
