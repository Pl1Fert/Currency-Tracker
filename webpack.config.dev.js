const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");
const path = require("path");

module.exports = merge(config, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
        historyApiFallback: true,
    },
});
