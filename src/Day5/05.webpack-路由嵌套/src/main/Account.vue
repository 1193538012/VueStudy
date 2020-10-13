<template>
    <div>
        <h1>这是 Account 组件</h1>

        <router-link to="/account/login">登录</router-link>
        <router-link to="/account/register">注册</router-link>

        <router-view></router-view>
    </div>
</template>
 
<script>
export default {
    
}
</script>

<style lang="scss" scoped>
/* 普通的style标签只支持 普通的 样式，如果想要启用 scss 或 less ，需要为 style 元素，设置lang属性   */
//只要咱们的sty1e标签，是在vue组件中定义的，那么，推荐都为sty1e开启 scoped属性
/*样式的 scoped是通过css的属性选择器实现的*/
body{
    div{
        font-style: italic;
    }
}
</style>