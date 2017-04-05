const path = require('path');
const glob = require('glob');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const BUNDLE_PATH = '/bundle';

const entryFiles = glob.sync(__dirname + '/client/entries/**/*.js');

// glob all entries files from the entries directory. Use the file's "basename" as
// webpack's bundle name (key of the entry object)
const entry = entryFiles.reduce((obj, entryFile) => {
    obj[path.basename(entryFile, '.js')] = path.resolve(__dirname, '..', entryFile);
    return obj;
}, {});

module.exports = {
    context: __dirname,
    // devtool: '#cheap-module-eval-source-map',
    devtool: 'cheap-source-map',
    entry: entry,
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './bundle'),
        publicPath: BUNDLE_PATH
    },
    resolve: {
        // modules: [path.join(__dirname, './components'), 'node_modules'],
        extensions: [".js", ".es.js", ".jsx", ".json", ".html"]
        // descriptionFiles: ["package.json"],
        // enforceExtension: false,
        // mainFields: ["browser", "main"],
        // aliasFields: ["browser"],
        // mainFiles: ["index"]
    },
    // externals: {
    //     // require("jquery") is external and available
    //     //  on the global var jQuery
    //     // "window": "window"
    // },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'babel-preset-es2015',
                        'babel-preset-react'
                    ].map(require.resolve)
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader?localIdentName=[name]__[local]__[hash:base64:5]!sass-loader!postcss-loader')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('base.css'),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [autoprefixer];
                }
            }
        })
    ],
    devServer: {
        publicPath: BUNDLE_PATH,
        noInfo: true,
        stats: {
            colors: true
        }
    }
};
