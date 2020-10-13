//由于 webpack是基于Node进行构建的，所有， webpack的配置文件中，任何合法的Node代码都是支持的
const path = require('path')

//导入 安装的 内存中生成html插件
//只要是插件，都一定要放到 plugins 节点中去
//这个插件的两个作用
//1.自动在内存中根据指定页面生成一个内存的页面
//2.自动，把打包好的 bundle.s追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//通过node中的模块操作，向外暴露一个配置对象
//当以命令行形式运行 webpack或 webpack-dev-server的时候，工具会发现，我们并没有提供要打包的文件的入口和出口文件，
//此时，他会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出
//的这个配置对象，然后根据这个对象，进行打包构建
module.exports = {
    mode: 'development', // 设置mode
    entry: path.join(__dirname,'./src/main.js'),//入口文件
    output: {//出口文件
        path: path.join(__dirname,'./dist'),
        filename: 'bundle.js'//指定输出文件的名称
    },
    devServer: { // 这是配置dev-server的第二种方式，相对来说，这种麻烦一些
        //--open --port 3000 --contentBase src --hot
        open: true,//自动打开浏览器
        port: 3000,//设置启动时的运行端口
        contentBase: 'src',//指定托管的根目录
        hot: true //启用热更新
    },
    plugins:[
        new htmlWebpackPlugin({//创建一个在内存中生成html页面的插件
            template: path.join(__dirname,'./src/index.html'),//指定模板页面，间来回根据指定的页面路径，去内存中 生成页面
            filename: 'index.html',//指定生成页面的名称

        }),
        new VueLoaderPlugin(),
    ],
   module: {//这个节点，用于配置 所有第三方模块 加载器
       rules:[//所有第三方模块 匹配规则
            { test: /\.css$/, use: ['style-loader','css-loader'] },//配置处理 .css文件 的 第三方loader
            { test: /\.less$/,use: ['style-loader','css-loader','less-loader'] },//配置处理 .less文件 的 第三方loader
            { test: /\.scss$/,use: ['style-loader','css-loader','sass-loader'] },//配置处理 .sass文件 的 第三方loader
            { test: /\.js$/,  use:  'babel-loader',exclude: /node_modules/},//这是配置babel来转化高级ES语法 
            { test:/\.vue$/, use: 'vue-loader' },
            {test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, loader: 'file-loader',  },
       ]
   },
   resolve: {
       alias: {//设置vue被导入时包的路径
           //"vue$":"vue/dist/vue.js"
       }
   }
}