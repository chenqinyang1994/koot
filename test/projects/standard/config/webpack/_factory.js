const path = require('path')
const src = path.resolve(__dirname, '../../src')

module.exports = async () => ({

    // 所有的入口脚本 (entry) 均为客户端/浏览器端 (__CLIENT__) 使用
    // 在模板中如何引用请参见模板文件
    entry: {
        /**
         * !! 特殊入口 !!
         * 在 React 执行之前运行的脚本
         * 引用的 CSS 资源会自动被拆分到 critical.css 文件中
         */
        critical: path.resolve(src, './critical.js'),

        // 自行添加的入口
        specialEntry: path.resolve(src, './special-entry.js'),
    },

    module: {
        rules: [
            {
                test: /\.(ico|gif|jpg|jpeg|png|webp)$/,
                loader: 'file-loader?context=static&name=assets/[hash:32].[ext]',
                exclude: /node_modules/
            }, {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                exclude: /node_modules/,
                options: {
                    noquotes: true,
                }
            }
        ]
    },

    plugins: [
        undefined, // Koot.js: 处理 webpack 配置时会自动过滤掉 null、undefined 等无意义的项
    ],

})
