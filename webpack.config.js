var webpack = require("webpack");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: __dirname,
        filename: "./dst/bundle.js"
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        noParse: /node_modules\/json-schema\/lib\/validate\.js/,
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.json$/, loader: "json-loader" }
        ]
    },
    node: {
        console: true,
        fs: "empty",
        net: "empty",
        tls: "empty"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            comments: false,
            compress: {
                warnings: false
            }
        })
    ]
}