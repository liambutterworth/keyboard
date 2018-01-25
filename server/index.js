//
// Server
//

const Koa   = require( 'koa' );
const serve = require( 'koa-static' );
const path  = require( 'path' );

// create app
const app = new Koa();

// serve build as a public directory
app.use( serve( path.resolve( __dirname, '../build' ) ) );

// listen for requests
app.listen( process.env.PORT );
