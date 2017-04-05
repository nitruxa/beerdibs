const webpack = require('webpack');
const config = require('./webpack.config');

config.devtool = false;
config.plugins = config.plugins || [];
config.plugins.push(
    new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false
    })
);

// set global vars
config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            // Useful to reduce the size of client-side libraries, e.g. react
            NODE_ENV: JSON.stringify('production')
        }
    })
);

config.plugins.push(
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            sequences: true,
            'dead_code': true,
            conditionals: true,
            booleans: true,
            unused: true,
            'if_return': true,
            'join_vars': true,
            'drop_console': true,
            'drop_debugger': true
        },
        mangle: false,
        comments: false
    })
);

module.exports = config;
