<template>
  <el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="landing" v-if="!LoggedIn">
          <h1 class="titleLogo animated infinite lightSpeedIn delay-1s">Scroll mu up!</h1>
          <el-form @submit.prevent.native="newPlayer">
            <span>Your name Here :*</span>
            <el-input placeholder="Anata no namae.." v-model="Name" autofocus="true"></el-input>
            <el-button class="buttoninput" @click="newPlayer" type="primary" round>JOIN !</el-button>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <div class="lobby" v-if="LoggedIn">
      <el-container>
        <el-header class="headerlobby">
          <!-- <el-button @click="leftGame" type="danger" round>Left Game!</el-button> -->
          <p class="headerlobbybutton" style="cursor: pointer" @click="leftGame">
            <strong>Walk Out !</strong>
          </p>
        </el-header>
        <el-main>
          <h1>WELCOME {{ Name }}</h1>
          <div class="createRoom">
            <el-row>
              <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark">
                  <el-input
                    style="margin-bottom:20px"
                    placeholder="create room name"
                    v-model="Room"
                  >
                    <el-button
                      @click="newRoom"
                      type="primary"
                      slot="append"
                      class="createRoomButton"
                    >Create Room!</el-button>
                  </el-input>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="allRoom"></div>
          <div class="container" style="display:flex; flex-wrap:wrap">
            <!-- <div v-for="(room ,i) in Rooms" :key="i" style="margin:20px"> -->
              <RoomCard v-for="(room ,i) in Rooms" :key="i" :room="room"></RoomCard>
            <!-- </div> -->
          </div>
        </el-main>
      </el-container>
    </div>
  </el-row>
</template>

<script>
import store from "../store";
import { mapState } from "vuex";
import RoomCard from "./RoomCard.vue";

export default {
  components: {
    RoomCard
  },
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
      if (this.Name !== "") {
        localStorage.setItem("username", this.Name);
        this.LoggedIn = true;
      } else {
        this.$alert("Masukin nama ya kawan :)", "Ededehh", {
          confirmButtonText: "OK",
          callback: action => {
            this.$message({
              type: "info",
              message: `Please banget input your name :)`
            });
          }
        });
      }
    },
    newRoom() {
      if (this.Room !== "") {
        store.dispatch("createNewRoom", {
          name: this.Name,
          room: this.Room
        });
      } else {
        this.$message({
          showClose: true,
          message: "Gaboleh kosong gblk",
          type: "error"
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
@import url("https://fonts.googleapis.com/css?family=Faster+One&display=swap");
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

/* .box-card {
  width: 480px;
} */
.landing {
  margin-top: 220px;
}
.titleLogo {
  font-family: "Faster One", cursive;
  font-size: 70px;
}
.el-button.buttoninput {
  margin-top: 20px;
}
.el-button.createRoomButton.el-button--primary {
  /* background-color: #409EFF; */
  color: black;
}
.headerlobby {
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
}
.headerlobbybutton {
  border: 2px solid rgb(205, 205, 213);
  border-radius: 30px;
  padding: 20px;
  display: flex;
  background-color: ghostwhite;
  box-shadow: 0px 1px 5px 0.03px;
  /* justify-content: center;
  align-content: center; */
  align-items: center;
}
</style>
