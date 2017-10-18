//已将其分解为webapck.common.js,webpack.dev.js,webpack.prod.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    devtool: 'inline-source-map', //可以看到报错的具体位置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'   //添加hash，处理缓存问题，如果我们不做修改，然后再次运行构建，我们的文件名按照期望，依然保持不变
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
        //图片转换base64,注意url-loader内置了file-loader
        { test: /\.(png|jpg|jpeg)$/, loader: 'url-loader?limit=8192' }
        ]
    },
    plugins: [
        //清理dist文件夹，去除不适用部分
        new CleanWebpackPlugin(['dist']),
        /*利用HtmlWebpackPlugin插件，自动生成一个Index.html文件，
        * 解决修改打包文件名后，Index.html文件中仍然使用老的打包文件名坑
        */
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        //只在生产环境中压缩图片
        new ImageminPlugin({
            pngquant: {
                quality: '95-100'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new UglifyJSPlugin()    //压缩，精简没有使用的代码
    ],
    devServer: {
        //webpack 服务器配置
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        progress: true,
        hot: true,
        inline: true, //实时刷新
        colors: true, //终端中输出结果为彩色
    },
};