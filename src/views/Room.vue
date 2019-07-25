<template>
  <div>
    <h1>{{ $route.params }}</h1>
    <h2>{{ JoinedRoom.name }}</h2>
    <h3 v-for="(player,i) in JoinedRoom.players" :key="i">{{ player }}</h3>
    <el-button @click="leftRoom" type="danger" round>Left</el-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store";
export default {
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
