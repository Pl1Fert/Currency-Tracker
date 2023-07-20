const webpack = require("webpack");
const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");

//TODO: need to finish config

module.exports = merge(config, {
    mode: "production",
    devtool: "source-map",
});
