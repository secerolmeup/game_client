<template>
    <div>
        <b-container class="pt-5">
            <div class="d-flex justify-content-between">
                <div class="player-chat w-75 mx-5">
                    <b-list-group-item href="#" style="background-color: #66101F; color: whitesmoke !important;" class="flex-column align-items-start lobby-heading">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1" style="font-weight: bold;">Chat Room</h5>
                        </div>

                    </b-list-group-item>

                    <b-list-group style="height:300px; background-color: white; overflow: auto;">
                        <b-list-group-item v-for="message in enteredMsg" :key="message.id" class="d-flex justify-content-between align-items-center">
                        <div>
                            <span style="font-weight:bold; color: #616161 !important;">{{ message.player }}: </span>  
                            <span style="color: #616161 !important;">
                            {{ message.message }}

                            </span>
                        </div>

                        <small class="text-muted color: #616161 !important;">{{ message.time }}</small>
                        </b-list-group-item>
                    </b-list-group>

                    <div class="chat-input">
                        <b-form @submit.prevent="sendMessage">
                            <b-form-input id="chat-message" v-model="message" placeholder="Message" autocomplete="off"></b-form-input>
                        </b-form>
                    </div>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
import db from '@/firebase/config.js'

export default {
    data(){
        return{
            message: '',
            enteredMsg: [],
            roomId: '',
        }
    },
    created() {  
        this.roomId = this.$route.params.id
        // this.currentPlayer = localStorage.player
        
        db.collection("rooms").doc(this.roomId)
        .onSnapshot((doc) => {
            let messages = doc.data().messages
            let players = doc.data().players
            
            let arr = []
            for(let player of players) {
            arr.push(player.name)
            }
            // this.roomMaster = doc.data().roomMaster
            this.enteredMsg = messages
            // this.players = arr
            // this.ready = doc.data().ready
        });
    },
    methods:{
        sendMessage(){
            let date = new Date()
      
            let player = {
                player: localStorage.getItem('player'),
                message: this.message,
                time: `${date.getHours()}:${date.getMinutes()}`
            }
            let room = db.collection("rooms").doc(this.roomId)
            room
                .get()
                .then((doc) => {
                    let messages = doc.data().messages
                    
                    messages.push(player)
                    this.message = ""
                    room.update({
                        messages: messages
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style scoped>

</style>
