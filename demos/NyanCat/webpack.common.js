const path = require ('path');

module.exports = {
	entry: "./src/app.js",
	output: {
		path: path.resolve (__dirname, "dist"),
		filename: "app.js"
	},
	resolve: {
		alias: {
			"openfl": path.resolve (__dirname, "node_modules/openfl/lib/openfl")
		}
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
			{ test: /\.swf$/, loader: 'swf-loader' }
		]
	}
};