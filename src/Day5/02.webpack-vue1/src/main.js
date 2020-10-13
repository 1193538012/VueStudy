//入口文件
console.log('ok')

//如何在 webpack构建的项目中，使用vue进行开发
//复习 在普通网页中如何使用vue
//1.使用 script标签，,引入vue的包
//2.在 index页面中，创建一个id为 app div容器
//3.通过 new vue得到一个vm的实例

//在webpack中尝试使用vue
//注意：在 webpack中，使用 import Vue from 'vue'导入的vue构造函数，功能不完整，只提供了 runtime-only的方式，并没有提供像网页中那样的使用方式
import Vue from 'vue'
//import Vue from '../node_modules/vue/dist/vue.js'
//回顾包的查找规则
//1.找项目根目录中有没有 node_modules的文件夹
//2.在node_modules中根据包名，找对应的vue文件夹
//3.在vue文件夹中，找一个叫做 package.json的包配置文件
//4.在 package.json文件中，查找一个main属性【main属性指定了这个包在被加载时候，的入口文件】
// var login = {
//     template: '<h1>这是login组件，是使用网页中形式创建出来的组件</h1>'
// }
//1.导入 login 组件
import login from './login.vue'
//默认，webpack 无法打包 .vue文件 ，需要安装 相关loader:
//cnpm i vue-loader vue-template-compiler -D
//在配置文件中 新增loader配置项 { test:/\.vue$/, use: 'vue-loader' }
var vm = new Vue({
    el: '#app',
    data: {
        msg: '123'
    },
    // components:{
    //     login
    // }
    // render: function(createElements){//新版需要与VueLoaderPlugin结合使用
    //     return createElements(login)
    // }
    //render: (createElements) =>{
    // render: createElements =>{//只有一个参数可以省略小括号
    //     return createElements(login)
    // }
    render: c => c(login) //去掉花括号 和return
    
})
//vue.runtime.esm.js:620 [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.


//总结梳理： webpack中如何使用vue
//1.安装vue的包： cnpm i vue -S
//2.由于在 webpack中，推荐使用.vue这个组件模板文件定义组件，所以，需要安装能解析这种文件的 loader cnpm i vue-loader vue-template-complier -D   这个新版loader需要填加插件new VueLoaderPlugin(),
//3.在main.s中，导入vue模块 import Vue from 'vue'
//4.定义一个.vue结尾的组件，其中，组件有三部分组成： template script style
//5.使用 import login from './login.vue'导入这个组件
//6.创建vm的实例 var vm= new Vue（{e1："#app'， render：c=>c（login）}）
//7.在页面中创建一个id为app的div元素，作为我们vm实例要控制的区域；

//import m1 from './test.js'
//import m1,{ title } from './test.js'
//import m1,{ title,content } from './test.js'
import m1,{ title as t33,content } from './test.js'
console.log(m1)
//console.log(title+'----------'+content)
console.log(t33+'----------'+content)




