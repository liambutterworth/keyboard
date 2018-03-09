//
// Row
//
// :: Render
// :: Properties

import React     from 'react';
import PropTypes from 'prop-types';

//
// Render
//

const Row = ( props ) => (
	<div className="grid__row">
		{ props.children }
	</div>
);

//
// Properties
//

Row.defaultProps = {
	children: null,
};

Row.propTypes = {
	children: PropTypes.node,
};

export default Row;
