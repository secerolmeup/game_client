<template>
<div>
  <h1>{{ $route.params }}</h1>
  <h2> {{ data.name }}</h2>
  <h3 v-for="(player,i) in data.players" :key="i"> {{ player }}</h3>
</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      data: {}
    };
  },
  computed: {
    ...mapState(["Rooms"])
  },
  mounted: function() {
    let found = this.Rooms.filter(room => {
      if (room.id == this.$route.params.roomId) {
        return room;
      }
    })
    this.data = found[0];
  }
};
</script>

<style>
</style>
