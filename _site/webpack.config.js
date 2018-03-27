const path               = require( 'path' );
const ExtractTextPlugin  = require( 'extract-text-webpack-plugin' );
const HtmlWebpackPlugin  = require( 'html-webpack-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );

module.exports = {
	context: `${ __dirname }/source/`,
	entry:   './index.js',

	output: {
		path:       `${ __dirname }/build`,
		filename:   '[name].[hash].js',
		publicPath: '/build/',
	},

	resolve: {
		extensions: [ '.js', '.json' ],

		modules: [
			path.resolve( __dirname, 'source' ),
			path.resolve( __dirname, 'node_modules' ),
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
				use: 'css-loader!sass-loader?includePaths[]=source!autoprefixer-loader',
			}),
		}, {
			test:    /\.(jpe?g|png|woff(2)?|eot|ttf)(\?[a-z0-9]+)?$/,
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
		new HtmlWebpackPlugin({ template: 'index.html', filename: '../index.html' }),
		new CleanWebpackPlugin([ 'build' ], { watch: true }),
	],
};
