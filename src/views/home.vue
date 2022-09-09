<!-- 首页 -->
<template>
	<div>
		<div class="homecon homeLeft">
			<div class="homeLeftEchart homeLeftEchart1">
				<div class="xiaoxian"></div>
				<div class="xiaoxian zuoshang"></div>
				<div class="xiaoxian zuoxia"></div>
				<div class="xiaoxian youxia"></div>
				<div class="topTitle">
					<p>年度卫星影像总数</p>
				</div>
			</div>
			<div class="homeLeftEchart homeLeftEchart2">
				<div class="xiaoxian zuoxia"></div>
				<div class="xiaoxian youxia"></div>
				<div class="topTitle">
					<p>年度卫星影像数据量</p>
				</div>
			</div>
		</div>
		<div class="homecon homeRight">
			<div class="homeLeftEchart homeRightEchart1">
				<div class="xiaoxian"></div>
				<div class="xiaoxian zuoshang"></div>
				<div class="xiaoxian zuoxia"></div>
				<div class="xiaoxian youxia"></div>
				<div class="topTitle">
					<p>各类卫星影像总数</p>
				</div>
			</div>
			<div class="homeLeftEchart homeRightEchart2">
				<div class="xiaoxian zuoxia"></div>
				<div class="xiaoxian youxia"></div>
				<div class="topTitle">
					<p>各类卫星影像数据量</p>
				</div>
			</div>
		</div>
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
		z-index: 5555;
		top:60px;
		width:20vw;
		height: calc(100vh - 100px);
	}
	.homeLeft{
		left: 0;
	}
	.homeLeftEchart{
		background-color: rgba(23, 49, 71, 0.9);
		width: 100%;
		height: 50%;
		position: relative;
		border-right: 2px solid #00a4ff;
		border-left: 2px solid #00a4ff;
		.xiaoxian{
			width: 20px;
			height: 2px;
			background-color: #00a4ff;
		}
		.zuoshang{
			position: absolute;
			top:0px;
			right:0px;
		}
		.zuoxia{
			position: absolute;
			bottom:0px;
			left:0px;
		}
		.youxia{
			position: absolute;
			bottom:0px;
			right:0px;
		}
		.topTitle{
			width: 200px;
			height: 40px;
			background-color: #00a4ff;
			background:-moz-linear-gradient(top,#00a4ff,rgba(23, 49, 71, 0.1));
			background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#00a4ff), to(rgba(23, 49, 71, 0.1)));
			border-bottom-left-radius: 30px;
			border-bottom-right-radius: 30px;
			position: absolute;
			top:0px;
			left:50%;
			margin-left: -100px;
			p{
				text-align: center;
				color: #fff;
				font-weight: bold;
				line-height: 35px;
			}
		}
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
			// border:1px solid red;
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
				width: 100%;
				position: absolute;
				left:0;
				height: 2px;
				top: 0;
			}
			img.line2{
				width: 100%;
				position: absolute;
				left:0;
				bottom: 0;
				height: 2px;
			}
		}
	}
</style>