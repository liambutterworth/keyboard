import React    from 'react';
import Home     from 'containers/Home';
import NotFound from 'containers/NotFound';

import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

console.log( process );
console.log( `PUBLIC_URL: ${ process.env.PUBLIC_URL }` );

const Routes = () => (
	<Router basename={ 'keyboard' }>
		<Switch>
			<Route path="/" exact component={ Home } />
			<Route component={ NotFound } />
		</Switch>
	</Router>
);

export default Routes;
