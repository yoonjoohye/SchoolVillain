const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.(js)$/,
                terserOptions: {
                    compress: {
                        unused: true,
                        drop_console: true, // 콘솔 로그를 제거한다
                    }
                }
            }),
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    }
});