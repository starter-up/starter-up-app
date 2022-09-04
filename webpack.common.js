const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = () => {
    return {
        mode: 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            publicPath: '/',
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.(js|ts|tsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/env',
                                    '@babel/preset-react',
                                    [
                                        '@babel/preset-typescript',
                                        { allExtensions: true, isTSX: true },
                                    ],
                                ],
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        'css-loader',
                    ],
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        'css-loader',
                        'less-loader',
                    ],
                },
                {
                    test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
                    use: ['file-loader?name=[name].[ext]?[hash]'],
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        'url-loader?limit=10000&mimetype=application/font-woff',
                    ],
                },
                {
                    test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader',
                },
            ],
        },
        plugins: [
            new Dotenv(),
            new webpack.ProvidePlugin({
                react: 'react',
                'react-dom': 'react-dom',
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            }),
        ],
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                process: 'process/browser',
            },
        },
    };
};
