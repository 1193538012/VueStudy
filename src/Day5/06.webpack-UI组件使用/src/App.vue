<template>
    <div>
        <h1>这是 APP 组件</h1>


        <mt-button type="default"  icon="back" plain size="small"  @click.native="show">default</mt-button>
    <mt-button type="primary"  icon="more" size="large"  @click.native="show2">>primary</mt-button>
    <mt-button type="danger" size="normal"  @click.native="show3">danger</mt-button>
        
<mybtn>12345</mybtn>

<button type="button" class="mui-btn mui-btn-royal">
					紫色
				</button>

        <router-link to="/account">Account</router-link>
        <router-link to="/goodslist">GoodsList</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            toastInstance: null
        }
    },
    created(){
        this.getList();
    },
    methods: {
        getList(){
            this.show();
            setTimeout(() => {
                this.toastInstance.close();
            }, 2000);


        },
        show(){
            //Toast('提示信息');
            this.toastInstance = Toast({
                message: '提示asdasda',
                position: 'top',
                duration: 2000
            });

        },
        show2(){
           Toast({
                message: '提示',
                position: 'bottom',
                duration: 5000
            });
        },
        show3(){
            Toast({
                duration: -1,
                message: '操作成功',
                iconClass: 'glyphicon glyphicon-heart',
                className: 'mytoast'
            });
        },
    }
}
</script>

<style>

</style>