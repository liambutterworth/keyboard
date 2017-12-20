const ExtractTextPlugin  = require( 'extract-text-webpack-plugin' );
const HtmlWebpackPlugin  = require( 'html-webpack-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const path               = require( 'path' );

module.exports = {
	context: `${ __dirname }/client/`,

	entry: [
		'./index.js',
	],

	output: {
		path:     `${ __dirname }/build`,
		filename: '[name].[hash].js',
	},

	resolve: {
		extensions: [ '.js', '.json' ],

		modules: [
			path.resolve( __dirname, 'client' ),
			path.resolve( __dirname, 'node_modules' ),
		],
	},

	module: {
		loaders: [ {
			test:    /\.js$/,
			exclude: /node_modules/,
			use:     'babel-loader',
		}, {
			test:    /\.css$/,
			exclude: /node_modules/,

			use: ExtractTextPlugin.extract( {
				use: 'css-loader!postcss-loader',
			} ),
		}, {
			test:    /\.(jpe?g|png|woff(2)?|eot|ttf)(\?[a-z0-9]+)?$/,
			exclude: /node_modules/,
			use:     'url-loader?limit=8192&name=[path][name].[hash].[ext]',
		}, {
			test:    /\.svg$/,
			exclude: /node_modules/,
			use:     'svg-inline-loader',
		} ],
	},

	plugins: [
		new ExtractTextPlugin( '[name].[hash].css' ),

		new HtmlWebpackPlugin( {
			template: 'index.html',
		} ),

		new CleanWebpackPlugin( [ 'build' ], {
			root:    __dirname,
			verbose: true,
			watch:   true,
		} ),
	],
};
