const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '/dist')
    },
    devServer: {
        noInfo: true,
        quiet: true,
        overlay: {
            errors: true,
            warnings: false
        }
    }
}