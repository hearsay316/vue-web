const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack  = require('webpack') ;
module.exports = {
    mode: 'production',
    module:{
        rules:[
            {test:/\.css$/,use:[
                // mini-css-extract-plugin
                {
                    loader: 'style-loader',
                    options: {
                      insertAt: 'top',
                    },
                },
                { // @语法引入了css文件这个文件可能是sass
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                },
                },
                'sass-loader',
            ]}
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            // 字符串必须要包两层
            'production':JSON.stringify('production'),
        }),
        new CleanWebpackPlugin(),
    ]
}