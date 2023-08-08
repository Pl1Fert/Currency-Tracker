const webpack = require("webpack");
const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");
const dotenv = require("dotenv").config({ path: __dirname + "/.env", systemvars: true });

const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = merge(config, {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js",
    },
    optimization: {
        minimize: true,
        runtimeChunk: "single",
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin(),
        new webpack.DefinePlugin({
            isDevelopment: false,
            "process.env": JSON.stringify(dotenv.parsed),
            "process.env.NODE_ENV": JSON.stringify("production"),
        }),
        new CompressionPlugin(),
    ],
});
