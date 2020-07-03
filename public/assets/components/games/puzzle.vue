<script type="text/javascript">
module.exports = {
	name: 'game-puzzle',
	props: {
		src: {
			type: String,
			default:()=>{
				return 'http://localhost:10241/assets/image/light.jpg'
			}
		}
	},
	data() {
		return {
			load: true
		}
	},
    components: {
    	'puzzle-board': window["puzzle-board"].default
    },
	mounted() {
		console.log(window["puzzle-board"])
		// let scriptEle = document.createElement('script')
		// scriptEle.src = 'https://unpkg.com/vue-8-puzzle'
		// document.body.appendChild(scriptEle)
		// scriptEle.onload = () => {
		// 	this.load = true
		// }
		// setTimeout(()=>{
		// 	this.load = true
		// }, 1000)
		console.log('加载END')
	}
}
</script>
<template>
	<div id="game-puzzle">
		<puzzle-board v-if="load" :src="src" />
	</div>
</template>