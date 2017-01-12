let Webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let autoPreFixer = require('autoprefixer-core');
let path = require('path');
let assetsPath = path.resolve(__dirname, 'public', 'assets');
let entryPath = path.resolve(__dirname, 'frontend', 'index.module.js');
let host = process.env.APP_HOST || 'localhost';
//let StatsPlugin = require('stats-webpack-plugin');
//let cssWring = require('csswring');
//let urlLoader = require('url-loader');
//let nodeModulesPath = path.resolve(__dirname, 'node_modules');
//let bowerModulePath = path.resolve(__dirname, 'frontend', 'lib');

let config = {

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
        preLoaders: [
            {
                test: /\.js$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                loader: "jshint-loader"
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                //loaders: ['babel-loader', 'required?import[]=angular']
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                //loader: 'style!css!postcss',
                loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
                //loader: 'style-loader/useable!css-loader!postcss-loader',
            },
            {
                test: /\.less$/,
                //loader: 'style!css!postcss!less'
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
                /*path: assetsPath,
                 filename: 'styles.less'*/
            },
            /* {
             test: /\.scss$/,
             //loader: 'style!css!sass'
             loader: ExtractTextPlugin.extract("style-loader", "css-loader!scss-loader")
             },*/
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
                //loader: 'ng-cache'
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
        new ExtractTextPlugin(assetsPath + "/styles.css"),
        // We have to manually add the Hot Replacement plugin when running
        // from Node
        new Webpack.HotModuleReplacementPlugin()
    ],
    jshint: {
        // any jshint option http://www.jshint.com/docs/options/
        // i. e.
        camelcase: true,

        // jshint errors are displayed by default as warnings
        // set emitErrors to true to display them as errors
        emitErrors: false,

        // jshint to not interrupt the compilation
        // if you want any file with jshint errors to fail
        // set failOnHint to true
        failOnHint: false,

        // custom reporter function
        reporter: function (errors) {
        }
    }
};

module.exports = config;