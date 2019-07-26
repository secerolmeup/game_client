<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>  
    <PreviewPlayer />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import PreviewPlayer from '@/components/PreviewPlayer.vue'
export default {
  name: 'home',
  components: {
    HelloWorld,
    PreviewPlayer
  }
}
</script>
