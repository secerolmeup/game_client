<template>
  <div class="game">
    <h1>
      <a @click="cheat">Scroll Mu up!</a>
    </h1>
    <el-row>
      <el-col :span="8">
        <div class="grid-content left">
          <div class="leftside">
            <h1>
              Game Statisti<span class="cheat" @click="activeCheat">c</span>:
            </h1>
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
            <h1>Your Score:</h1>
            <h2>{{score}}</h2>
            <el-button @click="playAgain">Play Again</el-button>
            <result/>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content right">
          <div class="rightside">
            <p>Time Left :</p>
            <h3>{{playtime}}</h3>
            <player-score></player-score>
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
import PlayerScore from '../components/PlayersScore.vue'
import result from '../components/Result.vue'
export default {
  components : {
    PlayerScore,
    result
  },
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
      hidden: "benar",
      cheatayam: false
    };
  },
  methods: {
    playAgain() {
      console.log("main lagi");
      this.game = false;
      this.isEnd = false;
      this.playtime = 15
      this.hitungmundur = 4
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    load() {
      if (this.count < 100000) {
        this.count += 10;
      }
    },
    myScore(score) {
      this.score = score;
      console.log(score, "ini milik saya");
    },
    showposition(position) {
      console.log(position, "ini positionnya");
      this.hovered = position;
      this.$store.dispatch('updatepoint', {
          point : this.hovered,
          myroom : this.$route.params.roomId
      })
    },
    startGame() {
      let countdowns = setInterval(() => {
        console.log("ini di dalam interval");
        if (this.hitungmundur !== 0) {
          this.hitungmundur--;
        } else {
          this.isStart = true;
          clearInterval(countdowns)
          let hitungan = setInterval(() => {
            console.log("interval 1 detik");
            if (this.playtime > 0) {
              this.playtime--;
            } else {
              setTimeout(() => {
                clearInterval(hitungan);
                this.isStart = false;
                this.isEnd = true;
              }, 1500);
            }
          }, 1000);
        }
      }, 1000);
      //   this.beforeBegin();
      console.log("udah selesai itung");
    },
    activeCheat() {
      this.cheatayam = true;
    },
    cheat() {
      console.log("cheat activated");
      if (this.playtime === 0) {
        this.score = 1000000;
      } else {
        this.score = -999;
      }
    }
  },
  watch: {
    playtime: function() {
      console.log(this.playtime, this.cheatayam, "loh jalan ga sih?");
      if (this.playtime === 0 && this.cheatayam === true) {
        this.score = 1000000;
      }
    }
  },
  computed: {
    scorepertama() {
      return Math.round((((this.hovered * 5) / 4) * 3) / 2);
    },
    scorekedua() {
      return this.hovered;
    },
    scoreketiga() {
      return Math.round(
        Math.random() * ((this.hovered * 2 * 2 * 2 * 2 * 2) / 100)
      );
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
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  /* background-image: url('https://i.pinimg.com/originals/a5/16/68/a51668b32ae4aa9968f9ad95316c2fc3.jpg') */
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
  border: 4px solid coral;
  border-radius: 5px;
  top: 80px;
  left: 50px;
  /* background-color: coral; */
  background-image: url("https://i.pinimg.com/originals/22/df/1e/22df1e36da6bb646e01470d936b96ff2.jpg");
}
.rightside {
  height: 300px;
  position: fixed;
  width: 285px;
  border: 4px solid brown;
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
.beforestart {
  display: flex;
  flex-direction: column;
}
.hitungmundur {
  font-size: 50px;
}
</style>