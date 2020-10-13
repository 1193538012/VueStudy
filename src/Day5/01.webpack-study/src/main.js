//这个 main.js 是我们项目的JS入口文件

//1. 导入 Jquery 
//es6中导入模块的一种的方式  import *** from ***
//由于 ES6的代码 太高级 ，浏览器解析不了 ，所以，这一行执行会报错
import $ from 'jquery'
//node引入 const $ = require('jquery')

//使用 import语法导入css样式表
import './css/index.css'
import './css/index.less'
import './css/index.scss'
//注意： webpack，默认只能打包处理Js类型的文件，无法处理其它的非Js类型的文件
//如果要处理非Js类型的文件，我们需要手动安装一些合适第三方 loader 加载器；
//1.如果想要打包处理css文件，需要安装 cnpm i style-loader css-loader-D
//2.打开 webpack.config.js这个配置文件，在里面，新增一个配置节点，叫做modu1e，它是一个对象；在这个modu1e对象身上，有个rules属性，这个rules属性是个数组；这个数组中，存放了，所有第三方文件的匹配和处理规则；

//注意： webpack处理第三方文件类型的过程
//1.发现这个要处理的文件不是js文件，然后就去配置文件中，查找有没有对应的第三方 loader 规则
//2.如果能找到对应的规则，就会调用对应的loader处理这种文件类型
//3.在调用loader的时候，是从后往前调用的；
//4.当最后的一个loader调用完毕，会把处理的结果，直接交给 webpack进行打包合并，最终输出到bundle.js中去

$(function(){
    $('li:odd').css('backgroundColor','red')
    $('li:even').css('backgroundColor',function(){
        return '#' + 'D97634'
    })
})


//webpack 可以做什么事情
//1.webpack 能够处理js文件的互相依赖关系
//2.能够处理js的兼容问题，把高级的浏览器不识别的语法，转为低级的，浏览器能正常识别的语法
//3. 命令 webpack .\src\main.js -o .\dist\bundle.js

//只用webpack 生成bundle.js     写webpack.config.js  指定入口出口

//监听代码改变  自动打包  npm i webpack-dev-server -D 
//使用 webpack-dev-server这个工具，来实现自动打包编译的功能

//1.运行 npm i webpack-dev-server -D把这个工具安装到项目的本地开发依赖                 npm run dev
//2.安装完毕后，这个工具的用法，和 webpack命令的用法，完全一样
//3.由于，我们是在项目中，本地安装的 webpack-dev- server，所以，无法把它当作脚本命令，在
//powershell终端中直接运行；（只有那些安装到全局-g的工具，才能在终端中正常执行）
//4.注意： webpack-dev- server这个工具，如果想要正常运行，要求，在本地项目中，必须安装 webpack
//5. webpack-dev- server帮我们打包生成的 bundle.is文件，并没有存放到实际的物理磁盘上；而是
//直接托管到了电脑的内存中，所以，我们在项目根目录中，根本找不到这个打包好的 bundle.js；
//6.我们可以认为， webpack-dev- server把打包好的文件，以一种虚拟的形式，托管到了咱们项目的根
//目录中，虽然我们看不到它，但是，可以认为，和 dist src node modules平级，有一个看不见的文件
//叫做 bundle.js

//class 关键字，是ES6中提供的新语法，是用来 实现 ES6 中面向对象的编程的方式
class Person{
    //使用static关键字可以定义静态属性
    //所谓的静态属性，就是可以直接通过类名直接访问的属性 Person.info
    //实例属性，只能通过类的实例，来访问的属性，叫做实例属性
    static info = {name: 'zs', age: 20}
}

//访问Person类身上的  info  静态属性
console.log(Person.info)
//在 webpack中，默认只能处理一部分ES6的新语法，一些更高级的Es6语法或者Es7语法webpack是处理不了的：这时候，就需要借动于第三方的loader，来帮助 webpack处理这些高级的语法，当第三方loadr把高级语法转为低级的语法之后，会把结果交给 webpack去打包到bundle.js中
//通过 Babel , 可以帮我们将 高级的语法转换为 低级的语法
//1.在 webpack中，可以运行如下两套 命令，安装两套包   ，去安装Babel 相关的loader功能
//1.1.第一套包： cnpm i babel-core babel-loader babel-plugin-transform-runtime -D
//1.2.第二套包： cnpm i babel-preset-env babel-preset-stage-0 -D
//2.打开webpack的配置文件
//2.打开 webpack的配置文件，在 module节点下的rules数组中，添加一个新的 匹配规则:
//2.1 {test:/\.js$/,use:'babel-loader',exclude:/node_modules/} 
//2.2注意：在配置babel的loader规则的时候，必须把 node_modules目录，通过 exclude选项排除掉：原因有俩:
//2.2.1如果不排除 node_modules，则Babel会把 node_modules中所有的第三方JS文件,都打包编译,这样,会非常消耗CPU，同时，打包速度非常慢;
//2.2.2哪怕，最终，Babel把所有 node_modules中的JS转换完毕了，但是，项目也无法正常运行!
//3.在项目的根目录中，新建一个四做.babelrc的Babel配置文件，这个配置文件，属于JSON格
//式，所以，在写.babelrc配置的时候，必须符合JSON语法规范：不能写注释，字符串必须用双引号
//3.1在，babe1xe写如下的配置                      preset即语法  
                // {
                //     "presets": [
                //         "@babel/env"
                //     ],
                //     "plugins": [
                //         "@babel/plugin-transform-runtime",
                //         "@babel/plugin-proposal-class-properties"
                //     ]
                // }
//4.了解：目前，我们安装的babel-preset-env，是比较新的Es语法，之前，我们安装的是
//babel-preset-es2015，现在，出了一个更新的语法播件，叫做babel-pzeset-env，它包含了所有
//的和es***相关的语法

//Java c# 实现面向对象的方式完全一样，class是从后端语言中借鉴过来的，来实现面向对象
//var p1 = new Person();
//p1.xxx   //实例属性

// //之前
// function Animal(name){
//     this.name = name;
// }
// Animal.info = 123

// var a1 = new Animal('小花');

// //这是静态属性
// console.log(Animal.info)
// //这是实例属性
// console.log(a1.name)





