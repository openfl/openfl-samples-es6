const path = require ("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: "./src/app.js",
	output: {
		path: path.resolve (__dirname, "dist"),
		filename: "app.js"
	},
	devtool: "source-map",
	resolve: {
		alias: {
			"openfl": path.resolve (__dirname, "node_modules/openfl/lib/openfl")
		}
	},
	optimization: {
		// temporarily needed for swf-loader until a future update of OpenFL
		sideEffects: false
	},
	module: {
		rules: [
			{ test: /\.js$/, loader: "babel-loader" },
			{ test: /\.swf$/, loader: 'swf-loader' }
		]
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				"public"
			]
		})
	],
	performance: {
		hints: false
	}
};