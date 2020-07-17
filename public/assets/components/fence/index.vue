<script type="text/javascript">
module.exports = {
	name: 'v-fence',
	// model:{
	//       prop:'open',//为了和v-model默认的value区分，将prop改为自定义的名称
	//       event:'input'//为了和v-model默认的input区分，将event改为click
	//     },
	props: {
		tree: {
			type: Array,
			default: ()=>{
				return [
					{title: '设置', icon: 'icon', list: []}
				]
			}
		},
	},
	inject: {tempData: 'injectData'},
	data() {
		return {
			active: 0,
			list: this.tree[0].list,
			params: this.tempData
		}
	},
	methods: {
		activeList(item, index) {
			this.active = index
			this.list = item.list
			this.updateValue()
		},
		emit(x) {
			if (x.target.value) {
			    const kv = x.target.name.split('.')
			    if (kv.length > 1) {
			        this.$set(this.params[kv[0]],kv[1], x.target.value)
			    }else{
			        this.params[x.target.name] = x.target.value
			    }
			}
			this.$emit('emit', x)
		},
		clickEmit(e) {
			this.$emit('clickEmit', e)
		},
		updateValue () {
			setTimeout(()=>{
				this.$refs.split.querySelectorAll('input,select').forEach(e=>{
			    		const kv = e.name.split('.')
			    		let tv
					    if (kv.length > 1) {
					    	tv = this.params[kv[0]][kv[1]]
						}else{
					    	tv = this.params[kv[0]]
						}
						if (e.type === 'radio') {
							if(tv === e.value) {
							    e.setAttribute('checked', true)
							}
						}else{
							e.value = tv || ''
						}
				})
			}, 500)
		}
	},
	mounted() {
		// 处理默认值
	    this.updateValue()
	}
}
</script>
<template>
	<div class="split" ref="split">
		<div class="leftSet">
			<div v-for="(item, index) in tree" :key="item.title" :class="['leftTitle',active === index?'active':'']" @click="activeList(item, index)">
	            <svg v-if="item.icon" class="icon-font" aria-hidden="true" style="font-size: 22px;">
                    <use :xlink:href=`#${item.icon}`></use>
                </svg>
	            <span>
	                {{item.title}}
	            </span>
        	</div>
		</div>
		<div class="rightSet">
			<div v-if="typeof list === 'string'" v-html="list" @change="emit" @click="clickEmit"></div>
			<div v-else>
				<component v-bind="list.bind" :is="list.component">
				</component>
			</div>
			<!-- <slot>
				<span class="rightTitle">
				  设置
				</span>
				<div class="divide"></div>
				<div class="options">
				    <checkbox>大</checkbox>
				    <checkbox>小</checkbox>
				    <span>图标缩放后大小</span>
				</div>
				<div class="options">
				    <radio>左</radio>
				    <radio>下</radio>
				    <radio>右</radio>
				    <span>Dock 所在屏幕位置</span>
				</div>
			</slot> -->
		</div>
	</div>
</template>
<style>
@import url('/assets/styles/split.css');
</style>