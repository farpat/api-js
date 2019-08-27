module.exports = {
    entry: __dirname + 'index.js',
    output: {
        path: __dirname + '/build',
        filename: '[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}