import React     from 'react';
import PropTypes from 'prop-types';

require( './style.css' );

const App = ( props ) => (
	<div id="app">
		{ props.children }
	</div>
);

App.propTypes = {
	children: PropTypes.node.isRequired,
};

export default App;
