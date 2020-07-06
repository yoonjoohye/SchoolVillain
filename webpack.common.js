const path = require('path');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    resolve: {
        modules: ['node_modules'],
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    entry: {
        'vendor': ['react', 'react-dom'],
        'index': path.resolve(__dirname, 'src', 'index.tsx')
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: {
                    loader: 'ts-loader'
                },
                exclude: /node_modules/

            },
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        }),
        new HtmlWebpackPlugin({
            favicon: path.resolve(__dirname, 'assets', 'img', 'favicon.png'),
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        new WebpackManifestPlugin({
            fileName: 'manifest.json'
        })
    ],
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    }
}