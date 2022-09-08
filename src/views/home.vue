<!-- 首页 -->
<template>
	<div>
		<div class="homecon homeLeft"></div>
		<div class="homecon homeRight"></div>
		<div class="homebottom">
			<div class="tongji">
				<p>111景</p>
				<p>今日新增景数</p>
				<img src="../assets/img/line.png" alt="" class="line">
				<img src="../assets/img/line.png" alt="" class="line2">
			</div>
			<div class="tongji">
				<p>451次</p>
				<p>今日下载量</p>
				<img src="../assets/img/line.png" alt="" class="line">
				<img src="../assets/img/line.png" alt="" class="line2">
			</div>
			<div class="tongji">
				<p>100106景</p>
				<p>景数统计</p>
				<img src="../assets/img/line.png" alt="" class="line">
				<img src="../assets/img/line.png" alt="" class="line2">
			</div>
			<div class="tongji">
				<p>9.85T</p>
				<p>数据量统计</p>
				<img src="../assets/img/line.png" alt="" class="line">
				<img src="../assets/img/line.png" alt="" class="line2">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
	.homecon{
		position: absolute;
		top:60px;
		width:20vw;
		height: calc(100vh - 100px);
		border:1px solid red;
	}
	.homeLeft{
		left: 0;
	}
	.homeRight{
		right:0;
	}
	.homebottom{
		position: absolute;
		bottom:40px;
		width:60vw;
		height:10vh;
		left: 20vw;
		display: flex;
		.tongji{
			width: 25%;
			padding-top: 20px;
			text-align: center;
			background-color: rgba(23, 49, 71, 0.5);
			position: relative;
			p{
				color: #fff;
				margin: 0;
			}
			p:first-child{
				color:yellow;
				font-size: 26px;
				font-weight: bold;
			}
			
			img.line{
				position: absolute;
				left:0;
				top: 0;
			}
		}
	}
</style>