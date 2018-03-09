//
// Column
//
// :: Render
// :: Properties

import React     from 'react';
import PropTypes from 'prop-types';

//
// Render
//

const Column = ( props ) => (
	<div className={ `grid-column grid-column--span-${ props.span }` }>
		{ props.children }
	</div>
);

//
// Properties
//

Column.defaultProps = {
	children: null,
	span:     '',
};

Column.propTypes = {
	children: PropTypes.node,
	span:     PropTypes.string,
};

export default Column;
