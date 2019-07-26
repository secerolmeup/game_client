<template>
    <div>
        <h1>Get player position</h1>
        <button @click="getPlayerPos">click me!</button>
    </div>
</template>

<script>
import db from '../firebase/config'
export default {
		data() {
			return{
				player: {
					position: 0,
				}
			}
		},
    methods: {
        getPlayerPos() {
            db
							.collection('players')
							.get()
							.then((querySnapshot) => {
									querySnapshot.forEach(player => {
											console.log(player.data())
											this.player.position = player.data().position
									})
							})
							.catch(console.log)
        }
		}
}
</script>

<style>

</style>
