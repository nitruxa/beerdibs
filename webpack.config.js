import path from 'path';
import autoprefixer from 'autoprefixer';

const PUBLIC_PATH = '/public';

export default {
    context: __dirname,
    devtool: '#cheap-module-eval-source-map',
    entry: './client/index.js',
    output: {
        filename: `app.js`,
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
                loader: 'style-loader!css-loader!sass-loader!postcss-loader'
            }
        ]
    },
    devServer: {
        publicPath: PUBLIC_PATH,
        noInfo: true,
        stats: {
            colors: true
        }
    },
    postcss: () => [autoprefixer]
};
