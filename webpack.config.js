const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    devtool: 'inline-source-map', //可以看到报错的具体位置
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        //告诉dev-server，哪个文件夹作为可访问文件
        contentBase: './dist'
    },
    module: {
        rules: [{
                /*webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。
                在这种情况下，以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader。*/
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        //清理dist文件夹，去除不适用部分
        new CleanWebpackPlugin(['dist']),
        //将新修改的名字添加到Index.html
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        //只在生产环境中压缩图片
        new ImageminPlugin({
            pngquant: {
                quality: '95-100'
            }
        })
    ],
};