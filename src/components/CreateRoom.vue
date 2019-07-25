<template>
  <el-row>
    <el-input placeholder="Name" v-model="Name"></el-input>
    <el-button @click="newPlayer" type="primary" round>Primary</el-button>
    <el-input placeholder="Room" v-model="Room"></el-input>
    <el-button @click="newRoom" type="primary" round>Primary</el-button>
    <div v-for="(room ,i) in Rooms" :key="i">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{room.name}}</span>
          <el-button
            @click="joinRoom(room.id)"
            style="float: right; padding: 3px 0"
            type="text"
          >Join Room</el-button>
        </div>
      </el-card>
    </div>
  </el-row>
</template>

<script>
import store from "../store";
import { mapState } from "vuex";
export default {
  data() {
    return {
      Name: "",
      Room: ""
    };
  },
  methods: {
    newPlayer() {
      localStorage.setItem("username", this.Name);
    },
    newRoom() {
      store.dispatch("createNewRoom", {
        name: this.Name,
        room: this.Room
      });
    },
    joinRoom(id) {
      let roomToJoin = this.Rooms.filter(room => {
        if (room.id === id) {
          return room;
        }
      });
      if (roomToJoin[0].players.length < 5) {
        localStorage.setItem("roomId", id);
        store.dispatch("joinRoom", {
          roomToJoin : roomToJoin[0]
        })
      }else{
        alert('room is full')
      }
    }
  },
  computed: {
    ...mapState(["Rooms"])
  }
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
