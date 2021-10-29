const path = require('path');

module.exports = {
	/**
	 * This is the main entry point for your application, it's the first file
	 * that runs in the main process.
	 */
	entry: './src/index.ts',
	// Put your normal webpack config below here
	module: {
		rules: require('./webpack.rules'),
	},
	resolve: {
		// alias: {
		// 	'@Main': path.resolve(__dirname, './src/main'),
		// 	'@Utils': path.resolve(__dirname, './src/utils'),
		// 	'@Renderer': path.resolve(__dirname, './src/renderer'),
		// },
		// root: [path.resolve('./')],
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
	},
};
