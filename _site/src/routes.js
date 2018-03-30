import React    from 'react';
import Home     from 'containers/Home';
import NotFound from 'containers/NotFound';
// import History  from 'history/createBrowserHistory';

import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

console.log( process.env.PUBLIC_URL );

const Routes = () => (
	<Router basename={ process.env.PUBLIC_URL }>
		<Switch>
			<Route path="/" exact component={ Home } />
			<Route component={ NotFound } />
		</Switch>
	</Router>
);

export default Routes;
