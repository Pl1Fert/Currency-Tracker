const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");
const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = merge(config, {
    mode: "development",
    devtool: "inline-source-map",
    plugins: [
        new webpack.DefinePlugin({
            isDevelopment: true,
            "process.env.NODE_ENV": JSON.stringify("development"),
        }),
        new Dotenv({
            systemvars: true,
        }),
    ],
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
        historyApiFallback: true,
    },
});
