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
				<div class="loginInputDiv" :model="login">
					<el-input v-model="login.username" prefix-icon="el-icon-user-solid" placeholder="请输入用户名" class="elInput"></el-input>
					<el-input v-model="login.password" prefix-icon="el-icon-lock" placeholder="请输入密码"  class="elInput"></el-input>
					<div class="loginVerification">
						<el-input prefix-icon="el-icon-key" placeholder="请输入验证码" v-model="login.verification" class="elInput codeInput"></el-input>
						<div class="loginCode"></div>
					</div>
					<div class="elCheckbox">
						<el-checkbox v-model="login.checked">记住密码</el-checkbox>
					</div>
					<div class="elBtn">
						<el-button type="primary" @click="loginBtn">登录</el-button>
						<!-- <el-button class="loginIn" @click="login">登录</el-button> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				login:{
					username:'',
					password:'',
					verification:'',
					checked:false
				}
			}
		},
		methods:{
			loginBtn(){
				this.$router.push('/home')
			}
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
		width:650px;
		// height:60vh;
		position: relative;
		top:5%;
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
			margin-top: 90px;
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
				padding:50px 100px;
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
	.elInput{margin-bottom: 10px;}
	.elCheckbox{
		text-align: right;
		margin-bottom: 10px;
	}
	.loginVerification{
		text-align: left;	
		display: flex;
	}
	.codeInput{
		width:200px;
		margin-right: 20px;
	}
	.loginCode{
		width:100px;
		height:40px;
		border:1px solid #136387;
		overflow: hidden;
	}
	
</style>
