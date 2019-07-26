<template>
  <div>
    <h1>{{ JoinedRoom.name }}</h1>
    <h3 v-for="(player,i) in JoinedRoom.players" :key="i">{{ player }}</h3>
    <el-button @click="leftRoom" type="danger" round>Left</el-button>
    <el-button @click="startGame"> Play Game</el-button>
    <chat></chat>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store";
import Chat from "@/views/Chat.vue";

export default {
  components: {
    Chat
  },
  data() {
    return {
      dataRoom: {},
      roomId: this.$route.params.roomId
    };
  },
  methods: {
    leftRoom() {
      store.dispatch("leftRoom");
    },
    startGame(){
      console.log('akan ek bagian game', this.roomId)
      this.$router.push(`/game/${this.roomId}`)
    }
  },
  computed: {
    ...mapState(["Rooms", "JoinedRoom"])
  },
  created: function() {
    store.dispatch("currentRoom", this.$route.params.roomId);
  }
};
</script>

<style>
</style>
