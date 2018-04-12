//
// Column
//
// :: Render
// :: Properties

import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';

//
// Render
//

const Column = ( props ) => {
	const classNames = ClassNames({
		grid__column:                              true,
		[`grid__column--span-${ props.span }`]:    props.span,
		[`grid__column--offset-${ props.offset }`]: props.offset,
	});

	return (
		<div className={ classNames }>
			{ props.children }
		</div>
	);
};

//
// Properties
//

Column.defaultProps = {
	children: null,
	offset:   '',
	span:     '',
};

Column.propTypes = {
	children: PropTypes.node,
	span:     PropTypes.string,
	offset:   PropTypes.string,
};

export default Column;
