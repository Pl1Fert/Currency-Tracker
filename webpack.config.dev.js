const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv").config({ path: __dirname + "/.env", systemvars: true });

module.exports = merge(config, {
    mode: "development",
    devtool: "inline-source-map",
    plugins: [
        new webpack.DefinePlugin({
            isDevelopment: true,
            "process.env": JSON.stringify(dotenv.parsed),
            "process.env.NODE_ENV": JSON.stringify("development"),
        }),
    ],
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
        historyApiFallback: true,
    },
});
