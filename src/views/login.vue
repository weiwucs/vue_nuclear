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
		// border:1px solid red;
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
		background-image: url("../assets/img/loginBg.png");
	}
	.earth{
		// border:1px solid red;
		width: 40%;
		position: fixed;
		top:50%;
		 transform:translate(10%,-50%);
		img{
			width: 100%;
		}
	}
</style>
