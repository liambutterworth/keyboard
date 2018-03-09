//
// Grid
//
// :: Render
// :: Properties

import React     from 'react';
import PropTypes from 'prop-types';
import Column    from './Column';
import Row       from './Row';

require( './style.css' );

//
// Render
//

const Grid = ( props ) => (
	<div className="grid">
		{ props.children }
	</div>
);

//
// Properties
//

Grid.defaultProps = {
	children: null,
};

Grid.propTypes = {
	children: PropTypes.node,
};

export default Grid;
export { Row, Column };
