<template>
  <div>
    <h1>{{ JoinedRoom.name }}</h1>
    <h3 v-for="(player,i) in JoinedRoom.players" :key="i">{{ player }}</h3>
    <el-button @click="leftRoom" type="danger" round>Left</el-button>
    <chat></chat>

  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store";
import Chat from "@/views/Chat.vue"

export default {
  components: {
    Chat
  },
  data() {
    return {
      dataRoom: {}
    };
  },
  methods: {
    leftRoom() {
      store.dispatch("leftRoom")
    }
  },
  computed: {
    ...mapState(["Rooms", "JoinedRoom"])
  },
  created: function() {
    store.dispatch("currentRoom", this.$route.params.roomId)
  }
};
</script>

<style>
</style>
