<!-- 右下角菜单 -->
<template>
	<div class="pointer">
		<div class="tool-manage-item" title="指北针">
			<span class="iconfont icon-zhibeizhen"></span>
		</div>
		<div class="tool-manage-item" title="复位" @click="flyToHome">
			<span class="iconfont icon-shouye"></span>
		</div>
		<div class="tool-manage-item" title="二三维切换" @click="convertDim">
			<span class="iconfont icon-ersanweiqiehuan"></span>
		</div>
		<div class="tool-manage-item" title="放大" @click="zoomIn">
			<span class="iconfont icon-jiahao"></span>
		</div>
		<div class="tool-manage-item" title="缩小" @click="zoomOut">
			<span class="iconfont icon-jianhao"></span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				flag: true
			}
		},
		methods: {
			flyToHome(){
				this.$emit('flyToHome')
			},
			zoomOut(){
				this.$emit('zoomOut')
			},
			zoomIn(){
				this.$emit('zoomIn')
			},
			convertDim(){
				this.$emit('convertDim', this.flag)
				this.flag = !this.flag
			}
		}
	}
</script>

<style scoped lang="scss">
	.pointer{
		position: absolute;
		right:20px;
		bottom:50px;
		.tool-manage-item{
			width:30px;
			height: 30px;
			border-radius: 3px;
			margin-bottom: 5px;
			cursor: pointer;
			background-color: rgba($color: #0bd3fb, $alpha: 0.5);
			transition: all 0.5s;
			text-align: center;
			span{
				line-height: 30px;
				color: #fff;
				font-size: 18px;
			}
			
		}
		.tool-manage-item:hover{
			background-color: rgba($color: #0bd3fb, $alpha: 1);
		}
	}
</style>
