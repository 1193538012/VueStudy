import Vue from 'vue'
//1.导入 vue-router 包  //cnpm i vue-router -S
import VueRouter from 'vue-router'
//2.手动安装 VueRouter
Vue.use(VueRouter)



//导入bootstrap样式
import 'bootstrap/dist/css/bootstrap.css'
import './css/app.css'

import './lib/mui/css/mui.css'
//注意：MUI不同于Mint-UI，MUI只是开发出来的一套好用的代码片段，里面提供了配套的样式，配套的HTML代码段，类似于Bootstrap；而Mint-UI，是真正的组件库，是使用Vue技术封装出来的成套的组件，可以无缝的和VUE项目进行集成开发因此，从体验上来说，Mint-UI体验更好，因为这是别人帮我们开发好的现成的Vue组件；从体验上来说，MUI和Bootstrap.类似；理论上，任何项目都可以使用MUI 或 Bootstrap，但是，MintUI只适用于Vue项目

//注意：MUI并不能使用npm去下载，需要自己手动从 github上，下载现成的包，自己解压出来，然后手动拷贝到项目中使用；
//导入所有的 MIntUI组件
//导入 Mint-UI
// import MintUI from 'mint-ui'
// //这里 可以省略 node_modules 这一层目录
// import 'mint-ui/lib/style.css'
// //将 MintUI 安装到 Vue 中
// Vue.use(MintUI)//把所有的组件，注册为全局的组件
////上边体积太大  下边是按需导入
import { Button } from 'mint-ui'
//使用 Vue.component
Vue.component(Button.name, Button);
//Vue.component('mybtn', Button);


//导入app组件
import app from './App.vue'
//导入自定义路由模块
import router from './router.js'

var vm = new Vue({
    el: '#app',
    render: c=>c(app),
    router//4.将路由对象挂载到 vm 上
})

//注意：App这个组件，是通过VM实例的 render函数，渲染出来的， rehder函数如果要渲染组件，渲染出来的组件，只能放到e1：#app'所指定的元素中；
// Account和 Goodslist组件，是通过路由匹配监听到的，所以，这两个组件，只能展示到属于路由的< router-view></ router-view>中去；