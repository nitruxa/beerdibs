require('babel-register')({
    extensions: ['.jsx', '.js'],
    presets: [
        'babel-preset-es2015-node4',
        'babel-preset-react'
    ].map(require.resolve),
    plugins: [
        'babel-plugin-transform-object-rest-spread'
    ].map(require.resolve)
});
