import React     from 'react';
import PropTypes from 'prop-types';

require( './style.css' );

const Column = ( props ) => {

	return (
		<div className={ `grid-column grid-column--span-${ props.span }` }>
			{ props.children }
		</div>
	);

};

Column.defaultProps = {
	children: null,
	span:     '',
};

Column.propTypes = {
	children: PropTypes.node,
	span:     PropTypes.string,
};

export default Column;
