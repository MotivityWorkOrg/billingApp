var Webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoPreFixer = require('autoprefixer-core');
var cssWring = require('csswring');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
let bowerModulePath = path.resolve(__dirname, 'frontend', 'lib');
var assetsPath = path.resolve(__dirname, 'public', 'assets');
var entryPath = path.resolve(__dirname, 'frontend', 'index.module.js');
var host = process.env.APP_HOST || 'localhost';

var config = {

    // Makes sure errors in console map to the correct file
    // and line number
    devtool: 'eval',
    entry: [

        // For hot style updates
        'webpack/hot/dev-server',

        // The script refreshing the browser on none hot updates
        'webpack-dev-server/client?http://' + host + ':3001',

        // Our application
        entryPath
    ],
    output: {
        path: assetsPath,
        filename: 'bundle.js'
    },
    module: {

        loaders: [
            {test: /\.js$/, loader: 'babel-loader'},
            {
                test: /\.css$/,
                //loader: 'style!css!postcss',
                loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
            },
            {
                test: /\.less$/,
                //loader: 'style!css!postcss!less'
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
                /*path: assetsPath,
                filename: 'styles.less'*/
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }

        ]
    },
    postcss: [autoPreFixer],

    plugins: [
        new ExtractTextPlugin(assetsPath+"/styles.css"),
        // We have to manually add the Hot Replacement plugin when running
        // from Node
        new Webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = config;