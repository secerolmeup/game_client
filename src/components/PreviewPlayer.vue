<template>
  <div>
    <div v-for="(player, i) in players" :key="i" class="row mb-1">
      <div class="col-sm-2">{{ player.name }}:</div>
      <div class="col-sm-10 pt-1">
        <b-progress :value="player.position" variant="primary" :key="i"></b-progress>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../firebase/config'
export default {
		data() {
			return{
				players: []
			}
		},
    methods: {
        getPlayerPos() {
            db
				.collection('players')
				.get()
				.then((querySnapshot) => {
						querySnapshot.forEach(player => {
								this.players.push(player.data())
						})
						console.log(this.players)
				})
				.catch(console.log)
        }
	},
	mounted() {
		this.getPlayerPos()
	}
}
</script>

<style>

</style>
