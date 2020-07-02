<script type="text/javascript">
import drag from '../drag'
module.exports = {
	name: 'modal',
	components: {
	    'drag': drag
	}
}
</script>
<template>
	<drag>
		<div class="toolbar" style="width: 100%;display: block;">
			<div style="user-select: none; -webkit-app-region: drag; cursor: default; width: 100%; box-sizing: border-box; display: flex; align-items: center; min-height: 22px; background-image: -webkit-linear-gradient(top, rgb(250, 250, 250) 0px, rgb(246, 246, 246) 2px, rgb(246, 246, 246) 100%); border-bottom: 1px solid rgb(209, 209, 209); border-top: 1px solid rgb(246, 246, 246); border-top-left-radius: 5px; border-top-right-radius: 5px; padding: 11px 8px;">
				<slot />	
			</div>
		</div>
	</drag>
</template>