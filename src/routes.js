import React    from 'react';
import Home     from 'containers/Home';
import NotFound from 'containers/NotFound';

import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

console.log( process.env.PUBLIC_URL );

const Routes = () => (
	<Router>
		<Switch>
			<Route path={ `${ process.env.PUBLIC_URL || '' }/` } exact component={ Home } />
			<Route component={ NotFound } />
		</Switch>
	</Router>
);

export default Routes;
