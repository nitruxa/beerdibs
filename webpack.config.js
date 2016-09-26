import path from 'path';
import glob from 'glob';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const PUBLIC_PATH = '/public';

const entryFiles = glob.sync(__dirname + '/client/entries/**/*.js');

// glob all entries files from the entries directory. Use the file's "basename" as
// webpack's bundle name (key of the entry object)
const entry = entryFiles.reduce((obj, entryFile) => {
    obj[path.basename(entryFile, '.js')] = path.resolve(__dirname, '..', entryFile);
    return obj;
}, {});

export default {
    context: __dirname,
    // devtool: '#cheap-module-eval-source-map',
    devtool: 'cheap-source-map',
    entry: entry,
    output: {
        filename: `[name].js`,
        path: path.join(__dirname, './public'),
        publicPath: PUBLIC_PATH
    },
    resolve: {
        modules: [path.join(__dirname, './components'), 'node_modules'],
        extensions: ["", ".js", ".es.js", ".jsx", ".json", ".html"],
        descriptionFiles: ["package.json"],
        enforceExtension: false,
        mainFields: ["browser", "main"],
        aliasFields: ["browser"],
        mainFiles: ["index"]
    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "window": "window"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: [
                        'babel-preset-es2015-node4',
                        'babel-preset-react'
                    ].map(require.resolve),
                    plugins: [
                        'babel-plugin-transform-object-rest-spread'
                    ].map(require.resolve)
                }
            },
            {
                test:   /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader!postcss-loader')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(path.join(__dirname, './public/base.css'))
    ],
    devServer: {
        publicPath: PUBLIC_PATH,
        noInfo: true,
        stats: {
            colors: true
        }
    },
    postcss: () => [autoprefixer]
};
