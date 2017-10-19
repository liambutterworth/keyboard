const HtmlWebpackPlugin  = require( 'html-webpack-plugin' );
const ExtractTextPlugin  = require( 'extract-text-webpack-plugin' );
const path               = require( 'path' );

module.exports = {
	context: `${ __dirname }/source/`,

	entry: [
		'babel-polyfill',
		'./index.js',
	],

	output: {
		path:       `${ __dirname }/build/`,
		filename:   '[name].[hash].js',
		publicPath: '/build/',
	},

	resolve: {
		extensions: [ '.js', '.jsx', '.json' ],

		modules: [
			path.resolve( './source' ),
			path.resolve( './node_modules' ),
		],
	},

	module: {
		loaders: [{
			test:    /\.js$/,
			exclude: /node_modules/,
			use:     'babel-loader',
		}, {
			test:    /\.css$/,
			exclude: /node_modules/,

			use: ExtractTextPlugin.extract({
				use: [ 'css-loader', 'postcss-loader' ],
			}),
		}, {
			test:    /\.(jpe?g|png)$/,
			exclude: /node_modules/,
			use:     'url-loader?limit=8192&name=[path][name].[hash].[ext]',
		}, {
			test:    /\.svg$/,
			exclude: /node_modules/,
			use:     'svg-inline-loader',
		}],
	},

	plugins: [
		new ExtractTextPlugin( '[name].[hash].css' ),

		new HtmlWebpackPlugin({
			template: 'index.html',
			filename: '../index.html',
		}),
	],
};
