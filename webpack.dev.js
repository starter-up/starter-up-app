const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = () =>
    merge(common(), {
        mode: 'development',
        cache: true,
        watch: false,
        devServer: {
            open: true,
            hot: true,
            port: 9095,
            historyApiFallback: true,
            proxy: {
                '/api': {
                    target: process.env.API_HOST,
                    pathRewrite: { '^/api': '' },
                    changeOrigin: true,
                },
            },
        },
        devtool: 'inline-source-map',
    });
