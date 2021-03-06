const webpack = require('webpack')
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    resolve: {
        modules: ['node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    entry: {
        'vendor': ['react', 'react-dom', 'react-router-dom'],
        'index': path.resolve(__dirname, 'src', 'index.tsx')
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript',
                            [
                                '@emotion/babel-preset-css-prop',
                                {
                                    sourceMap: true,
                                    autoLabel: true,
                                    labelFormat: '[dirname]-[filename]-[local]', //디렉토리명-파일명-변수명
                                    cssPropOptimization: true
                                }
                            ]
                        ],
                        plugins: [
                            '@babel/proposal-class-properties',
                            '@babel/proposal-object-rest-spread',
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    regenerator: true
                                }
                            ]

                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(ico|png|jpe?g|gif|svg|woff|woff2|ttf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/',
                            name: 'img/[name].[ext]?[hash]',
                            esModule: false
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
            chunkFilename: '[name][hash].chunk.css'
        }),
        new CopyPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'robots.txt'), to: 'robots.txt'}
            ]
        }),
        new HtmlWebpackPlugin({
            favicon: path.resolve(__dirname, 'assets', 'img', 'favicon.ico'),
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        new WebpackManifestPlugin({
            fileName: 'manifest.json'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'BUILD_ENV': JSON.stringify(process.env.BUILD_ENV),
            }
        }),
    ],
    output: {
        publicPath: '/',
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    }
}