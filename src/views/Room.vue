<template>
  <div>
    <h1>{{ JoinedRoom.name }}</h1>
    <h3 v-for="(player,i) in JoinedRoom.players" :key="i">{{ player }}</h3>
    <el-button @click="leftRoom" type="danger" round>Left</el-button>
    <el-button @click="startGame">Play Game</el-button>
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
import db from '@/firebase/config.js'

export default {
  components: {
    Chat
  },
  data() {
    return {
      dataRoom: {},
      roomId: this.$route.params.roomId,
      ready: ""
    };
  },
  methods: {
    leftRoom() {
      store.dispatch("leftRoom");
    },
    startGame() {
      console.log("akan ek bagian game", this.roomId);

      db.collection("lobby")
        .doc(this.roomId)
        .update({
          ready: true
        })
        .then(() => {
          this.ready = true;
        });
    }
  },
  computed: {
    ...mapState(["Rooms", "JoinedRoom"])
  },
  watch: {
    ready() {
      if (this.ready) {
        this.$router.push(`/game/${this.roomId}`);
      }
    }
  },
  mounted() {
    if (this.ready) {
      this.$router.push(`/game/${this.roomId}`);
    }
  },
  created: function() {
    store.dispatch("currentRoom", this.$route.params.roomId);
    db.collection("lobby")
      .doc(this.$route.params.roomId)
      .onSnapshot(doc => {
        this.ready = doc.data().ready;
      });
  }
};
</script>

<style>
</style>
