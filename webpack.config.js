const webpack = require( "webpack" )

module.exports = {
	entry: {
		main: './src/index.js', // front-end
	},
	output: {
		path: __dirname,
		filename: 'dist/[name].js',
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
			}
		]
	}
}
