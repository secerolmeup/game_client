<template>
  <div class="game">
    <h1>
      <a @click="startgame">ini game</a>
    </h1>
    <el-row>
      <el-col :span="8">
        <div class="grid-content left">
          <div class="leftside">
            <h1>Game Statistic:</h1>
            <p>player`s score</p>
            <span>{{hovered}}</span>
            <p>maximum score</p>
            <span>{{count}}</span>
            <p>last check point</p>
            <span>{{score}}</span>
          </div>
          <div class="arrowKiri" v-if="hidden === 'tipu'">
            <h1>Jangan Mudah percaya sama</h1>
            <!-- <img src="https://thumbs.gfycat.com/DelectableBreakableHuman-small.gif" alt /> -->
            <img
              class="imgarrowKiri"
              src="https://media1.giphy.com/media/yvBOvlY4rqgXP8h1Ih/source.gif"
              alt
            />
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content mid-1">
          <span v-if="isStart === false && isEnd === false" class="beforestart">
            <el-button class="buttonStart" @click="startGame">Start game</el-button>
            <span class="hitungmundur">{{hitungmundur}}</span>
          </span>
          <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
            <div class v-if="isStart === true">
              <li v-for="i in count" class="infinite-list-item" :key="i">
                <span @mouseover="showposition(i)">
                  <el-button round @mouseover="showposition(i)" @click="myScore(i)">{{ i }}</el-button>
                </span>
              </li>
            </div>
          </ul>
          <div class="chooseScore" v-if="isEnd === true">
            <!-- <h1>choose one of this number to be your score:</h1>
            <h4>
              <a>{{scorepertama}} </a>
            </h4>
            <h4>
              <a>{{scorekedua}} </a>
            </h4>
            <h4>
              <a>{{scoreketiga}}</a>
            </h4> -->
            <h1>Your Score: </h1>
            <h2>{{score}}</h2>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content right">
          <div class="rightside">
            <p>Time Left :</p>
            <h3>{{playtime}}</h3>
            <!-- <h2>{{hovered}}</h2>
            <h2>{{count}}</h2>
            <h2>{{score}}</h2>
            <h3>{{hitungmundur}}</h3>-->
          </div>
        </div>
        <div class="arrowKanan" v-if="hidden === 'tipu'">
          <h1>Jangan Mudah percaya sama</h1>
          <img
            class="imgarrowKanan"
            src="https://media1.giphy.com/media/yvBOvlY4rqgXP8h1Ih/source.gif"
            alt
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { setInterval, setTimeout, clearInterval } from "timers";
export default {
  data() {
    return {
      isStart: false,
      isEnd: false,
      hover: false,
      game: false,
      count: 0,
      hovered: 0,
      score: 0,
      pilihScore1: 0,
      pilihScore2: 0,
      pilihScore3: 0,
      countdown: false,
      hitungmundur: 5,
      playtime: 15,
      hidden: "benar"
    };
  },
  methods: {
    startgame() {
      this.game = true;
    },
    load() {
      if (this.count < 1000) {
        this.count += 2;
      }
    },
    myScore(score) {
      this.score = score;
      console.log(score, "ini milik saya");
    },
    showposition(position) {
      console.log(position, "ini positionnya");
      this.hovered = position;
    },
    startGame() {
      setTimeout(() => {
        console.log("ini di dalam interval");
        this.isStart = true;
        let hitungan = setInterval(() => {
          console.log("interval 1 detik");
          if (this.playtime > 0) {
            this.playtime--;
          } else {
            clearInterval(hitungan);
            this.isStart = false;
            this.isEnd = true;
          }
        }, 1000);
      }, 5000);
      //   this.beforeBegin();
      console.log("udah selesai itung");
    }
  },
  computed: {
    scorepertama() {
      return Math.round((((this.hovered * 5) / 4) * 3) / 2)
    },
    scorekedua() {
      return this.hovered
    },
    scoreketiga() {
      return Math.round(Math.random()*(this.hovered*2*2*2*2*2/100))
    }
  }
};
</script>

<style scoped>
.grid-content {
  border: 1px solid transparent;
  align-items: center;
  display: flex;
  align-content: center;
}
.mid-1 {
  border: 5px solid whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.game {
  margin: 0px;
  padding: 0px;
  background-color: #a6dd85;
  min-height: 100vh;
  align-items: center;
}
h1 {
  margin: 0px;
}
.leftside {
  height: 300px;
  position: fixed;
  width: 285px;
  border: 1px solid brown;
  border-radius: 5px;
  top: 80px;
  left: 50px;
  background-color: coral;
}
.rightside {
  height: 300px;
  position: fixed;
  width: 285px;
  border: 1px solid brown;
  border-radius: 5px;
  top: 80px;
  right: 50px;
  background-color: coral;
}
.el-button {
  width: 300px;
  height: 50px;
  /* border: 1px solid black; */
  border-radius: 20px;
  margin: 10px 0px;
}
li {
  list-style: none;
}
/* ul {
  padding-left: 60px;
} */
/* .buttonStart {
  margin-left: 60px;
} */
.arrowKiri {
  position: fixed;
  top: 500px;
  display: flex;
  flex-direction: column;
}
.imgarrowKiri {
  position: fixed;
  transform: rotate(180deg);
  width: 300px;
  height: 300px;
  top: 320px;
}
.imgarrowKanan {
  position: fixed;
  width: 300px;
  height: 300px;
  top: 320px;
}
.arrowKanan {
  position: fixed;
  top: 500px;
  display: flex;
  flex-direction: column;
}
.beforestart{
    display: flex;
    flex-direction: column
}
.hitungmundur{
    font-size: 50px;
}
</style>