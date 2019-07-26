<template>
  <div>
    <h1>ini score</h1>
    <div v-for="(player,i) in (Rooms.filter(el => el.id == this.$route.params.roomId)[0].players)" :key="i">
        <p>{{ `name : ${player.name} || position: ${player.position}` }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store";
export default {
  computed: {
    ...mapState(["Rooms"])
  },
  created: function() {
    store.dispatch("getExistRoom");
  }
};
</script>

<style>
</style>
