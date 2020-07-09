<script type="text/javascript">
module.exports = {
	name: 'v-mask',
	model:{
	      prop:'open',//为了和v-model默认的value区分，将prop改为自定义的名称
	      event:'input'//为了和v-model默认的input区分，将event改为click
	    },
	props: {
		open: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		open(n) {
			this.openState = n
		}
	},
	data() {
		return {
			openState: this.open
		}
	},
	methods: {
		closeMask() {
			// this.openState = false
			this.$emit('input', false)
		}
	},
	mounted() {
	  //监听键盘按键事件
	  this.$nextTick(() => {
		document.addEventListener('keyup', (e) => {
		  //此处填写你的业务逻辑即可
		  if (e.keyCode == 27) {
			this.closeMask()
		  }
		})
	  })
	}
}
</script>
<template>
	<div class="overlay overlay-contentscale" :class="{ 'open' : openState }">
		<slot>
			<nav>
				<ul>
					<li><a href="http://www.sucaihuo.com
			/" target="_blank">Home</a></li>
					<li><a href="http://www.sucaihuo.com
			/" target="_blank">jQuery</a></li>
					<li><a href="http://www.sucaihuo.com
			/" target="_blank">Html5</a></li>
					<li><a href="http://www.sucaihuo.com
			/" target="_blank">Css3</a></li>
					<li><a href="http://www.sucaihuo.com
			/" target="_blank">Contact</a></li>
				</ul>
			</nav>
		</slot>
	</div>
</template>
<style >
/* Overlay style */
.overlay {
	z-index: 999;
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	/*background: rgba(255, 255, 255, .3);*/
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .3);
}

/*.overlay-contentscale {
	visibility: hidden;
	-webkit-transform: translateY(100%);
	transform: translateY(100%);
	-webkit-transition: -webkit-transform 0.5s, visibility 0s 0.5s;
	transition: transform 0.5s, visibility 0s 0.5s;
}

.overlay-contentscale.open {
	visibility: visible;
	-webkit-transform: translateY(0%);
	transform: translateY(0%);
	-webkit-transition: -webkit-transform 0.5s;
	transition: transform 0.5s;
}*/
nav {
	text-align: center;
	margin: 50px auto;
	width: 100%;
}
.overlay-contentscale {
	visibility: hidden;
	opacity: 0;
	-webkit-transform: scale(0.9);
	transform: scale(0.9);
	-webkit-transition: -webkit-transform 0.2s, opacity 0.2s, visibility 0s 0.2s;
	transition: transform 0.2s, opacity 0.2s, visibility 0s 0.2s;
}

.overlay-contentscale.open {
	visibility: visible;
	opacity: 1;
	-webkit-transform: scale(1);
	transform: scale(1);	
	-webkit-transition: -webkit-transform 0.4s, opacity 0.4s;
	transition: transform 0.4s, opacity 0.4s;
}

.overlay-contentscale.open::before{
	background: url("/assets/image/dark.jpg") center / cover fixed;
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;
    filter: blur(20px);
    z-index: -1;
    /*margin: 30px;*/
}
</style>