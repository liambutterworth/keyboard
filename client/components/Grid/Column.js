import React     from 'react';
import PropTypes from 'prop-types';

const Column = ( props ) => (
	<div className={ `grid-column grid-column--span-${ props.span }` }>
		{ props.children }
	</div>
);

Column.defaultProps = {
	children: null,
	span:     '',
};

Column.propTypes = {
	children: PropTypes.node,
	span:     PropTypes.string,
};

export default Column;
