import React    from 'react';
import ReactDOM from 'react-dom';
import App      from 'components/App';
import Routes   from './routes';

require( './fonts.css' );

ReactDOM.render( <App><Routes /></App>, document.getElementById( 'root' ));
