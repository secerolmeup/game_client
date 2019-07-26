<template>
  <createroom></createroom>
</template>

<script>
import createroom from '../components/CreateRoom.vue'
import store from '../store'
export default {
  components : {
    createroom
  },
  created : function () {
    store.dispatch('getExistRoom')
  }
}
</script>

<style>

</style>
