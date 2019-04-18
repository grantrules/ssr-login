const path = require('path');

module.exports = {
	entry: './build/ClientApp.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'client.bundle.js',
	}
};
