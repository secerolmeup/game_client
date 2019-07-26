<template>
    <el-card class="box-card" >
        <div class="heading">
            <h3>Player</h3>
            <h3>Score</h3>
        </div>
        <div v-for="(player, i) in players" :key="i" class="text item">
            <div class="player-name">
                {{player.name}}
            </div>
            <div class="player-score">
                {{player.position}}
            </div>
        </div>
        <img src="https://media.tenor.com/images/47559d5d0ef0a47e8c099e3472f66c58/tenor.gif" alt="pepeDance" width="50%">
    </el-card>
</template>

<script>
export default {
    data(){
        return {
            // players: [
            //     {name: "joni", score: 1200},
            //     {name: "jaja", score: 2000},
            //     {name: "juna", score: 900},
            //     {name: "jaka", score: 1300},
            //     {name: "jola", score: 1900},
            //     {name: "judika", score: 700}
                
            // ]
            players: this.$store.state.resultGame
        }
    }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    display: flex;
    justify-content: space-evenly;
  }

  .box-card {
    width: 480px;
    height: 400px;
  }

  .heading {
      font-weight: 300;
      display: flex;
      justify-content: space-around;
  }
</style>
