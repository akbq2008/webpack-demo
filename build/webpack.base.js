const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '/dist')
    },
    devServer: {
        noInfo: true,
        // hotOnly: true,
        // contentBase: './dist',
        quiet: true,
        host: "192.168.2.82",
        port: 8000,
        overlay: {
            errors: true,
            warnings: false
        }
    }
}