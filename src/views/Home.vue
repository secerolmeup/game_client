<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <PreviewPlayer />
  </div>
</template>

<script>
// @ is an alias to /src
import PreviewPlayer from '@/components/PreviewPlayer.vue'
export default {
  name: 'home',
  components: {
    HelloWorld,
    PreviewPlayer
  }
}
</script>
