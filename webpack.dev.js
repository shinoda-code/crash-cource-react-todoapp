const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConf = require('./webpack.common.js');
const outputFile = '[name]';
const assetFile = '[name]';

module.exports = () => merge(commonConf({outputFile, assetFile}), {
    mode: 'development', 
    devtool: 'source-map',
    devServer: {
        port: 3309,
        historyApiFallback: true,
        open: true,
        contentBase: './public',
        watchOptions: {
            ignored: /node_modules/
        }
    },
    plugins: [
        new HtmlWebpackPlugin ({
            template: './src/index.html',
            inject: 'body', 
        }),
    ]
})