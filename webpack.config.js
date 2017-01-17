module.exports = {
	entry: "./index.js",
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	watch: true,
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: "babel"
			}
		]
	}
};