require('dotenv').config()

const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin')

const production = process.env.PRODUCTION === "true"

const editorEntry = "./src/Editor/main.js"
const gameEntry = "../Game/main.js"

module.exports = {
    mode: (production ? "production" : "none"),
    target: "electron-renderer",
    entry: (production ? gameEntry : editorEntry),
    // entry: gameEntry,
    output: {
        path: __dirname + "/build",
        filename: "bundle.js",
        globalObject: "this",
    },
    resolve: {
        extensions: ['.vue', '.js']
    },
    optimization: {
        minimize: production,
        minimizer: [new TerserPlugin({
            terserOptions: {
                mangle: false
            }
        })],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        }),
        new webpack.ProvidePlugin({ 'window.decomp': 'poly-decomp' })
    ],
    watch: true,
}