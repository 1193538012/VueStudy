import Vue from 'vue'
//1.导入 vue-router 包  //cnpm i vue-router -S
import VueRouter from 'vue-router'
//2.手动安装 VueRouter
Vue.use(VueRouter)

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