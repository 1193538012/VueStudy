<template>
    <div id="01BasicGrammar">
        <p>{{msg}}</p>
        <p>{{msg2}}</p>
    </div>
</template>

<script>
    export default {
        name: "01BasicGrammar",
        props: {
            msg: String
        },
        data() {
            return{
                msg2:'asdasdasd'
            }
        }
    }
</script>

<style scoped>

</style>
