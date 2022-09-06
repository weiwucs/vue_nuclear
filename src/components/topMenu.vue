<!-- 网站头部 -->
<template>
	<div class="topMenu">
		<div class='ksh-top-title'>
			<img src="../assets/img/logo.png" alt="">
			<span>三维可视化元数据管理系统</span>
		</div>
		<div class="ksh-top-menus">
			<div v-for="(item,i) in menus" class="menus" @click="activeMenu(i)">
				<span :class="item.icon"></span>
				<span>{{item.menu}}</span>
			</div>
		</div>
		<div class="ksh-top-user">
				<el-dropdown>
					<span class="el-dropdown-link">
						<i class="el-icon-user-solid"></i>
						用户名
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<div @click="personalCenter">
							<el-dropdown-item>个人中心</el-dropdown-item>
						</div>
						<div @click="changePassword">
							<el-dropdown-item>修改密码</el-dropdown-item>
						</div>
						<div @click="quit">
							<el-dropdown-item>退出</el-dropdown-item>
						</div>
					</el-dropdown-menu>
				</el-dropdown>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				menus:[{
					icon:'el-icon-s-home',
					menu:'首页',
					path:'home'
				},{
					icon:'el-icon-search',
					menu:'数据检索',
					path:'dataSearch'
				},{
					icon:'el-icon-coin',
					menu:'数据管理',
					path:'dataManage'
				},{
					icon:'el-icon-s-custom',
					menu:'人员管理',
					path:'userManage'
				}]
			}
		},
		methods:{
			activeMenu(index) {
			    this.$router.push(this.menus[index].path)
			}
		}
	}
</script>

<style scoped lang="scss">
	.topMenu{
		position: absolute;
		top:0px;
		left:0px;
		height: 60px;
		width: 100vw;
		background-color: rgba(23, 49, 71, 0.9);
		display: flex;
		.ksh-top-title{
			height: 100%;
			width: 500px;
			z-index: 2222;
			background: url(../assets/img/heade-title-bg.png);
			background-size: 100%;
			padding: 10px;
			img{
				width:40px;
				margin-left: 20px;
			}
			span{
				color:#fff;
				font-size: 26px;
				margin-left: 20px;
				font-weight: 700;
				vertical-align: top;
				font-style: italic;
			}
		}
		.ksh-top-menus{
			display: flex;
			height: 60px;
			line-height: 60px;
			color:#fff;
			font-size: 16px;
			.menus{
				padding-left:25px ;
				padding-right: 25px;
			}
			.menus:hover{
				cursor: pointer;
				background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(6,129,233,0.8));
			}
		}
		.ksh-top-user{
			position: absolute;
			right: 40px;
			height: 60px;
			top: 20px;
			.el-dropdown-link {
				cursor: pointer;
				color: #fff;
			}
		}
	}
</style>