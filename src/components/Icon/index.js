import React from 'react';
import PropTypes from 'prop-types';

require( './style.css' );

const Icon = props => (
	<i className="icon" dangerouslySetInnerHTML={{ __html: props.svg }} />
);

Icon.propTypes = {
	svg: PropTypes.string.isRequired,
};

export default Icon;
