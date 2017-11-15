const style        = require( './client/style.js' );
const autoprefixer = require( 'autoprefixer' );
const nested       = require( 'postcss-nested' );
const color        = require( 'postcss-color-function' );
const calc         = require( 'postcss-calc' );

const variables = require( 'postcss-simple-vars' )( {
	variables: style,
} );

const bassline = require( 'postcss-bassline' )( {
	baseFontSize:   style['base-font-size'],
	baseLineHeight: style['base-line-height'],
} );

module.exports = {
	plugins: [
		autoprefixer,
		nested,
		variables,
		bassline,
		color,
		calc,
	],
};
