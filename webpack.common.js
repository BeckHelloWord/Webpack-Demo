// 公共配置
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Production'
        })
    ],
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                /*webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。
                在这种情况下，以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader。
                postcss-loader 添加自动添加浏览器前缀css，记得根目录下创建postcss.config.js文件
                */

                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            },
            //图片转换base64,注意url-loader内置了file-loader
            {
                test: /\.(png|jpg|jpeg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
};