//
// Wrapper
//
// :: Render
// :: Properties

import React     from 'react';
import PropTypes from 'prop-types';

require( './style.css' );

//
// Render
//

const Wrapper = ( props ) => (
	<div className="wrapper">
		{ props.children }
	</div>
);

//
// Properties
//

Wrapper.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Wrapper;
