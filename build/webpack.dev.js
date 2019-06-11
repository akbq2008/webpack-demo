const merge = require('webpack-merge');
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.js');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


module.exports = merge(baseWebpackConfig, {
    // mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [
                    `Your application is running here: http://${
                        baseWebpackConfig.devServer.host
            }:${baseWebpackConfig.devServer.port}`
                ]
            },
            onErrors: undefined
        })
    ]
})