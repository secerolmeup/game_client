<template>
  <el-row>
    <div class="landing" v-if="!LoggedIn">
      <el-form @submit.prevent.native="newPlayer">
        <el-input placeholder="Name" v-model="Name"></el-input>
        <el-button @click="newPlayer" type="primary" round>JOIN !</el-button>
      </el-form>
    </div>
    <div class="lobby" v-if="LoggedIn">
      <el-button @click="leftGame" type="danger" round>Left Game!</el-button>
      <h1>WELCOME {{ Name }}</h1>
      <el-input style="margin-bottom:20px" placeholder="Room" v-model="Room"></el-input>
      <el-button @click="newRoom" type="primary" round>Create Room!</el-button>
      <div class="container" style="display:flex; flex-wrap:wrap">
        <div v-for="(room ,i) in Rooms" :key="i" style="margin:20px">
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
      </div>
    </div>
  </el-row>
</template>

<script>
import store from "../store";
import { mapState } from "vuex";
export default {
  data() {
    return {
      Name: localStorage.getItem("username")
        ? localStorage.getItem("username")
        : "",
      Room: "",
      LoggedIn: false
    };
  },
  methods: {
    newPlayer() {
      localStorage.setItem("username", this.Name);
      this.LoggedIn = true;
    },
    newRoom() {
      if (this.Room !== "") {
        store.dispatch("createNewRoom", {
          name: this.Name,
          room: this.Room
        });
      }
      else {
        this.$message({
          showClose: true,
          message: 'Gaboleh kosong gblk',
          type: 'error'
        });
      }
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
          roomToJoin: roomToJoin[0]
        });
      } else {
        alert("room is full");
      }
    },
    leftGame() {
      localStorage.clear();
      this.LoggedIn = false;
      this.Name = "";
    }
  },
  computed: {
    ...mapState(["Rooms"])
  },
  created: function() {
    if (localStorage.getItem("username")) {
      this.LoggedIn = true;
    }
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
