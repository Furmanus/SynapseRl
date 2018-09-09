const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
    new CleanWebpackPlugin('client/dist/*.*',
        {
            exclude: [],
            verbose: true,
            dry: false
        }
    ),
    new ExtractTextPlugin('[name].[chunkhash].bundle.css'),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'server/templates/login_template.pug'),
        chunks: ['vendors', 'login'],
        filetype: 'pug',
        filename: 'login.pug'
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'server/templates/dashboard_template.pug'),
        chunks: ['vendors', 'dashboard'],
        filetype: 'pug',
        filename: 'dashboard.pug'
    }),
    new HtmlWebpackPugPlugin()
];

module.exports = {
    entry: {
        login: ['babel-polyfill', path.resolve(__dirname, 'client/src/login/login.js')],
        dashboard: ['babel-polyfill', path.resolve(__dirname, 'client/src/app/app.js')],
        vendors: ['rot-js', 'react', 'react-dom', 'socket.io-client']
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'client/dist'),
        filename: '[name].[chunkhash].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js|jsx/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },
    plugins
};