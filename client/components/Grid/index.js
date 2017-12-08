import React     from 'react';
import PropTypes from 'prop-types';
import Column    from './Column';
import Row       from './Row';

require( './style.css' );

const Grid = ( props ) => (
	<div className="grid">
		{ props.children }
	</div>
);

Grid.defaultProps = {
	children: null,
};

Grid.propTypes = {
	children: PropTypes.node,
};

export default Grid;
export { Row, Column };
