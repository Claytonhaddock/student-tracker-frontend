require('dotenv').config()
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const production = process.env.NODE_ENV === 'production'
//dev config
module.exports = {
	context: path.join(__dirname, 'app'),
	resolve: {
		modules: [path.resolve(__dirname, "src"), "node_modules"],
		extensions: ['.js', '.scss', '.html', '.jpg', '.svg', '.png', '.gif']
	},
	entry: [].concat( production ? ['babel-polyfill'] : ["babel-polyfill", 'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server'], [
		'./index.js'
	]),

	devtool: production ? '' : 'source-map',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public'),
		publicPath: '/'
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.json?$/,
				use: 'json-loader',
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: {
									modules: true,
									localIdentName: '[path][name]__[local]--[hash:base64:5]'
								}
							},
							{ 	loader: 'sass-loader',
							  	options: {
									includePaths: [path.resolve(__dirname, 'src')]
									}
								},
							{ loader: 'postcss-loader' }
						]
				})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{loader: 'css-loader'}
						]
				})
			},
			{
				test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
				use: 'url-loader?limit=10000&mimetype=application/font-woff',
			},
			{
				test: /\.(ttf|eot|svg|ico|jpg|gif|png)(\?[a-z0-9#=&.]+)?$/,
				use: [
						{ loader: 'file-loader' }
					]
			}
		]
	},

	node: {
		net: 'empty',
		dns: 'empty'
	},

	devServer: {
		historyApiFallback: true,
		port: 8080,
		compress: true,
		contentBase: path.join(__dirname, 'dist'),
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				APP_ENV: JSON.stringify(process.env.APP_ENV || 'local'),
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
			}
		})
	].concat(production ? [
										new webpack.optimize.UglifyJsPlugin()
									] : [
										new webpack.HotModuleReplacementPlugin(),
										new webpack.DefinePlugin({
											DEVELOPMENT: JSON.stringify(true)
										}),
										new CaseSensitivePathsPlugin()
									]
	, [
		new webpack.ProvidePlugin({
			"React": "react",
		}),
		new ExtractTextPlugin("styles.css"),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html',
			// favicon: './assets/favicon.ico'
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					autoprefixer(),
				]
			}
		})
	])
};
