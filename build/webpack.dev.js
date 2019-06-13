const merge = require('webpack-merge');
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.js');
const config = require('../config/index')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const notifier = require('node-notifier');
var portfinder = require('portfinder');
const path = require('path');
const chalk = require('chalk');
var ICON = path.join(__dirname, 'logo.png');
const {
    VueLoaderPlugin
} = require('vue-loader')
const PORT = process.env.PORT && Number(process.env.PORT)
const WebpackConfig = merge(baseWebpackConfig, {
    // mode: 'development',
    module: {
        rules: [{
            test: /\.js$/,

            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/transform-runtime']
                }
            }

        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }],
    },
    // resolve: {
    //     extensions: ['js', 'vue'],
    //     alias: {
    //         '@': path.resolve(__dirname, 'src')
    //     }
    // },
    devServer: {
        host: config.dev.ip,
        port: PORT || config.dev.port,
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
})
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = WebpackConfig.devServer.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            WebpackConfig.devServer.port = port;
            WebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [
                        `Your application is running here: http://${
                            WebpackConfig.devServer.host
            }:${port}`
                    ]
                },
                onErrors: (severity, errors) => {
                    if (severity !== 'error') {
                        return;
                    }
                    const error = errors[0];
                    notifier.notify({
                        title: error.name,
                        message: severity + ': ' + error.name,
                        subtitle: error.file || '',
                        icon: ICON
                    });
                },
                clearConsole: false
            }))
            resolve(WebpackConfig)
        }
    });
});