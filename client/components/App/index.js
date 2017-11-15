import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';

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
