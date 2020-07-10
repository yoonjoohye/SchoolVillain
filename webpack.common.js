const path = require('path');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    resolve: {
        modules: ['node_modules'],
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    entry: {
        'vendor': ['react', 'react-dom','react-router-dom'],
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
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'font/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename:'[name][hash].chunk.css'
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
        publicPath: '/',
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    }
}