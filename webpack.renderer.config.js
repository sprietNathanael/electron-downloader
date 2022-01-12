const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const CopyPlugin = require('copy-webpack-plugin');

rules.push({
	test: /\.css$/,
	use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
	module: {
		rules,
	},
	plugins: [
		...plugins,
		new CopyPlugin({
			patterns: [{ from: 'src/renderer/public/locales', to: 'locales' }],
		}),
	],
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
	},
};
