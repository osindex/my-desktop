<script type="text/javascript">
module.exports = {
	name: 'v-modal',
	methods: {
		beforeClose(event) {
		    console.log(event);
		}
	}
}
</script>
<template>
	<modal name="v" @before-close="beforeClose">
	  <slot />
	</modal>
</template>