<!-- 右下角菜单 -->
<template>
	<div class="pointer">
		<div class="tool-manage-item" title="指北针">
			<span class="iconfont icon-zhibeizhen"></span>
		</div>
		<div class="tool-manage-item" title="复位" @click="flyToHome">
			<span class="iconfont icon-home"></span>
		</div>
		<div class="tool-manage-item" :title="name" @click="convertDim" >
			<span class="iconfont " :class='ditu'></span>
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
				ditu:"icon-ditu",
				name:'三维',
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
				if(this.flag){
					this.ditu = 'icon-ditu'
					this.name='三维'
				}else{
					this.ditu = 'icon-ditu1'
					this.name='二维'
				}
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
			background-color: rgba($color: #173147b3, $alpha:0.8);
			border:1px solid #444;
			transition: all 0.5s;
			text-align: center;
			span{
				line-height: 30px;
				color: #fff;
				font-size: 18px;
			}
			
		}
		.tool-manage-item:hover{
			background-color: rgba($color: #0680e8, $alpha: 1);
		}
	}
</style>
