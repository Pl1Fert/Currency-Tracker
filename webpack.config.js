const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js",
    },
    plugins: [
        new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ["dist"] }),
        new HtmlWebpackPlugin({
            favicon: "./public/favicon.ico",
            template: "./index.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx", ".d.ts"],
        alias: {
            "@": path.resolve(__dirname, "src/"),
            "@api": path.resolve(__dirname, "src/api/"),
            "@components": path.resolve(__dirname, "src/components/"),
            "@constants": path.resolve(__dirname, "src/constants/"),
            "@hooks": path.resolve(__dirname, "src/hooks/"),
            "@pages": path.resolve(__dirname, "src/pages/"),
            "@routers": path.resolve(__dirname, "src/routers/"),
            "@services": path.resolve(__dirname, "src/services/"),
            "@store": path.resolve(__dirname, "src/store/"),
            "@types": path.resolve(__dirname, "src/types/"),
        },
    },
};
