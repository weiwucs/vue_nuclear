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
						{{username}}
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
		<!-- 详情弹窗 -->
		<el-dialog title="详情" :visible.sync="dialogVisibleDetail" append-to-body>
			<el-descriptions  :column="2" border v-model="user">
			   <el-descriptions-item label="账号">{{user.ID}}</el-descriptions-item>
			   <el-descriptions-item label="姓名">{{user.name}}</el-descriptions-item>
			   <el-descriptions-item label="性别">{{user.sex}}</el-descriptions-item>
			   <el-descriptions-item label="年龄">{{user.age}}</el-descriptions-item>
			   <el-descriptions-item label="手机号">{{user.phone}}</el-descriptions-item>
			   <el-descriptions-item label="地址">{{user.address}}</el-descriptions-item>
			   <el-descriptions-item label="邮箱">{{user.email}}</el-descriptions-item>
			   <el-descriptions-item label="角色">
			   	<el-tag size="small">{{user.role}}</el-tag>
			   </el-descriptions-item>
			</el-descriptions>
			<div class="btnRight">
				<el-button size="small" type="primary" @click="userEdit">编辑</el-button>
				<el-button size="small" @click="dialogVisibleDetail = false">取消</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑" :visible.sync="dialogVisibleEdit" append-to-body>
			<el-descriptions :column="2" border v-model="userform">
			  <el-descriptions-item label="账号">
			  		<el-input v-model="userform.ID"></el-input>
			  	</el-descriptions-item>
			  	<el-descriptions-item label="姓名">
			  		<el-input v-model="userform.name"></el-input>
			  	</el-descriptions-item>
			  	<el-descriptions-item label="性别">
			  		<el-radio-group v-model="userform.sex">
			  			<el-radio label="男"></el-radio>
			  			<el-radio label="女"></el-radio>
			  		</el-radio-group>
			  	</el-descriptions-item>
			  	<el-descriptions-item label="年龄">
			  		<el-input v-model="userform.age" clearable></el-input>
			  	</el-descriptions-item>
			  	<el-descriptions-item label="手机号">
			  		<el-input v-model="userform.phone" clearable></el-input>
			  	</el-descriptions-item>
			   <el-descriptions-item label="地址">
			  		<el-input v-model="userform.address" clearable></el-input>
			  	</el-descriptions-item>
			  	<el-descriptions-item label="邮箱">
			  		<el-input v-model="userform.email" clearable></el-input>
			  	</el-descriptions-item>
			  </el-descriptions>
			  <div class="btnRight">
			  	
			  	<el-button size="small" type="primary">确认</el-button>
				<el-button size="small" @click="dialogVisibleEdit = false">取消</el-button>
			  </div>
		</el-dialog>
		<!-- 修改密码 -->
		<el-dialog title="修改密码" :visible.sync="dialogVisibleChangePassword" append-to-body width="30%">
			<el-form :model="password"  label-width="100px">
			    <el-form-item label="旧密码"> <el-input v-model="password.old"></el-input></el-form-item>
			    <el-form-item label="新密码"> <el-input v-model="password.new"></el-input></el-form-item>
			    <el-form-item label="确认密码"> <el-input v-model="password.again"></el-input></el-form-item>
			</el-form>
			<div class="btnRight">
				<el-button size="small" type="primary">确认</el-button>
				<el-button size="small" @click="dialogVisibleChangePassword = false">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				username:'张三',
				menus:[{
					icon:'el-icon-s-home',
					menu:'首页',
					path:'/home'
				},{
					icon:'el-icon-search',
					menu:'数据检索',
					path:'/dataSearch'
				},{
					icon:'el-icon-coin',
					menu:'数据管理',
					path:'/dataManage/GF'
				},{
					icon:'el-icon-s-custom',
					menu:'人员管理',
					path:'/userManage'
				}],
				user:{
					ID:'12345678',
					name:'krooe',
					sex:'男',age:'24',phone:'18812341234',address:'北京市朝阳区红军营南路',
					email:'123456@ld.com',
					role:'管理员',
				},
				dialogVisibleDetail:false,
				dialogVisibleEdit:false,
				userform:{},
				dialogVisibleChangePassword:false,
				password:{},
			}
		},
		methods:{
			activeMenu(index) {
			    this.$router.push(this.menus[index].path)
			},
			personalCenter(){
				this.dialogVisibleDetail = true
			},
			changePassword(){
				this.dialogVisibleChangePassword = true
			},
			userEdit(){
				this.dialogVisibleEdit = true
			},
			quit() {
				this.$confirm('是否退出当前系统?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '退出成功!'
					});
					this.$router.replace('/login')
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			
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