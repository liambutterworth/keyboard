const path                 = require( 'path' );
const CleanWebpackPlugin   = require( 'clean-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = {
	plugins: [
		new MiniCssExtractPlugin(),
		new CleanWebpackPlugin([ 'dist' ], { watch: true }),
	],

	resolve: {
		alias: {
			components: path.resolve( __dirname, 'src/components' ),
			containers: path.resolve( __dirname, 'src/containers' ),
			library:    path.resolve( __dirname, 'src/library' ),
			modules:    path.resolve( __dirname, 'node_modules' ),
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
				MiniCssExtractPlugin.loader,
				'css-loader',
				'sass-loader?includePaths[]=src',
			],
		}, {
			test:    /\.(jpe?g|png|woff(2)|eot|ttf)(\?[a-z0-9]+)?$/,
			exclude: /node_modules/,
			use:     'url-loader?limit=8192&name=[path][name].[hash].[ext]',
		}, {
			test:    /\.svg$/,
			exclude: /node_modules/,
			use:     'svg-inline-loader',
		}],
	},
};
