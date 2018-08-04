const webpack = require( 'webpack' )
const nodeExternals = require( 'webpack-node-externals' )

const clientConfig = {
	entry: {
		main: './src/index.js'
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

const serverConfig = {
	entry: {
		server: './src/server.js'
	},
	output: {
		path: __dirname,
		filename: 'dist/[name].js',
	},
	target: 'node',
	externals: [ nodeExternals() ],
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

module.exports = [ serverConfig, clientConfig ]
