<!-- 登录页 -->
<template>
	<div class="loginCon">
		<div class="logo">
			<img src="../assets/img/logo.png" alt="">
			<span>遥感信息与图像分析技术国家级重点实验室</span>
		</div>
		<div class="earth">
			<img src="../assets/img/earth.png" alt="">
		</div>
		<div class="loginIn">
			<p>三维可视化元数据管理系统</p>
			<div class="inputBg">
				<img src="../assets/img/loginBg.png" alt="">
				<div class="loginInputDiv">
					<el-input placeholder="请输入用户名"></el-input>
					<el-input placeholder="请输入密码"></el-input>
					<el-button size="small" type="primary">登录</el-button>
				</div>
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
	.logo{
		padding: 20px;
		img{
			width:60px;
		}
		span{
			color:#fff;
			font-size: 20px;
			font-weight: bold;
			position: absolute;
			top:35px;
			margin-left: 15px;
		}
	}
	.loginCon{
		width: 100vw;
		height: 100vh;
		background-image: url("../assets/img/bgLogin.jpg");
		background-size: 100% 100%;
	}
	.loginIn{
		width: 660px;
		height:435px;
		position: relative;
		top:10%;
		left:50%;
		p{
			font-size: 48px;
			font-weight: bold;
			color:#fff;
			text-align: center;
			font-style: italic;
			background-image:-webkit-linear-gradient(bottom,#5865b9,#22dcfd); 
			-webkit-background-clip:text;
			-webkit-text-fill-color:transparent; 
		}
		.inputBg{
			margin-top: 100px;
			text-align: center;
			position: relative;
			img{
				width:80%;
				height:80%;
			}
			.loginInputDiv{
				width: 80%;
				height: 100%;
				position: absolute;
				top:0;
				left: 10%;
				padding:70px 100px;
				
			}
			
		}
	}
	.earth{
		width: 35%;
		position: fixed;
		top:50%;
		 transform:translate(25%,-50%);
		img{
			width: 100%;
		}
	}
</style>
