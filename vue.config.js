
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
    assetsDir: './static',
    publicPath: './',
    outputDir: 'dist',
    lintOnSave: false,
    transpileDependencies: [
        'vuetify'
    ],
    configureWebpack: {
        module: {
            rules: [
                { 
                test: /\.csv$/,
                use: 'raw-loader'
                }
            ]
        }
    }
}
