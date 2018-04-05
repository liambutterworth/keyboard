const path               = require( 'path' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const HtmlWebpackPlugin  = require( 'html-webpack-plugin' );

module.exports = {
	plugins: [
		new CleanWebpackPlugin([ 'dist' ], { watch: true }),
		new HtmlWebpackPlugin({ template: 'src/index.html', filename: 'index.html' }),
	],

	output: {
		filename: '[name].[hash].js',
	},

	resolve: {
		alias: {
			modules:    path.resolve( __dirname, 'node_modules' ),
			assets:     path.resolve( __dirname, 'src/assets' ),
			containers: path.resolve( __dirname, 'src/containers' ),
			components: path.resolve( __dirname, 'src/components' ),
			library:    path.resolve( __dirname, 'src/library' ),
		},
	},

	module: {
		rules: [{
			test:    /\.js$/,
			exclude: /node_modules/,
			use:     'babel-loader',
		}, {
			test:    /\.css$/,
			exclude: /node_modues/,

			use: [
				'style-loader',
				'css-loader',
				'sass-loader?includePaths[]=src',
			],
		}, {
			test:    /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
			exclude: /node_modules/,
			use:     'url-loader?limit=8192&name=assets/fonts/[name].[hash].[ext]',
		}, {
			test:    /\.(jpe?g|png)(\?[a-z0-9]+)?$/,
			exclude: /node_modules/,
			use:     'url-loader?limit=8192&name=assets/images/[name].[hash].[ext]',
		}, {
			test:    /\.svg$/,
			exclude: /node_modules/,
			use:     'svg-inline-loader',
		}],
	},
};
