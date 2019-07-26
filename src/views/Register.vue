<template>
    <div class="register">
        <div>
            <p class="name">Scroll Me UP!</p>
            <div>
                <form @submit.prevent="register">
                    <el-input autofocus="true" placeholder="Please input your name here" v-model="input3" class="input-with-select">
                        <el-button slot="append" icon="el-icon-lollipop"></el-button>
                    </el-input>
                </form>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name: ''
        }
    },
    methods:{
        register(){
            let newUser = {
                name: this.name
            }
            let player = localStorage.setItem('player', newUser.name)
            this.$store.commit('SET_PLAYER', newUser.name)
            this.$router.push('/chat')
        }
    }
}
</script>

<style scoped>
.register  {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.name{
    font-family: 'Faster One', cursive;
    font-size: 65px;
}
</style>
