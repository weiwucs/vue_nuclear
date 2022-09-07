<!-- 人员管理-->
<template>
	<div>
		<topMenu></topMenu>
		<div class="mainCon">
			<h3><span class="el-icon-s-custom"></span>人员管理</h3>
			<div class="user-list">
				<el-button type="primary" size="small" @click="addInfo">新建</el-button>
				<el-button type="primary" size="small">导入</el-button>
				<el-button type="primary" size="small">样表下载</el-button>
				<el-button type="primary" size="small" @click="deleteList">删除</el-button>
				<div class="botanyTable">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border
						row-key="id" default-expand-all @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column prop="ID" label="账号" ></el-table-column>
						<el-table-column prop="name" label="姓名"></el-table-column>
						<el-table-column prop="sex" label="性别" ></el-table-column>
						<el-table-column prop="age" label="年龄"></el-table-column>
						<el-table-column prop="phone" label="手机号"></el-table-column>
						<el-table-column prop="address" label="地址"></el-table-column>
						<el-table-column prop="email" label="邮箱"></el-table-column>
						<el-table-column prop="role" label="权限"></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="details">详情</el-button>
								<el-button type="text" size="small" @click="edit">编辑</el-button>
								<el-button type="text" size="small" @click="deleteList">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="fenye">
						<el-pagination
						  background
						  layout="prev, pager, next"
						  :total="1000">
						</el-pagination>
					</div>
					
				</div>
			</div>
			
			<!-- 新增弹窗 -->
			<el-dialog title="新增" :visible.sync="dialogVisibleAdd" append-to-body>
				<el-descriptions :column="2" border v-model="addUserform">
					<el-descriptions-item label="账号">
						<el-input v-model="addUserform.ID"></el-input>
					</el-descriptions-item>
					<el-descriptions-item label="姓名">
						<el-input v-model="addUserform.name"></el-input>
					</el-descriptions-item>
					<el-descriptions-item label="性别">
						<el-radio-group v-model="addUserform.sex">
							<el-radio label="男"></el-radio>
							<el-radio label="女"></el-radio>
						</el-radio-group>
					</el-descriptions-item>
					<el-descriptions-item label="年龄">
						<el-input v-model="addUserform.age" clearable></el-input>
					</el-descriptions-item>
					<el-descriptions-item label="手机号">
						<el-input v-model="addUserform.phone" clearable></el-input>
					</el-descriptions-item>
					<el-descriptions-item label="地址">
						<el-input v-model="addUserform.address" clearable></el-input>
					</el-descriptions-item>
					<el-descriptions-item label="邮箱">
						<el-input v-model="addUserform.email" clearable></el-input>
					</el-descriptions-item>
				</el-descriptions>
				<div class="btnRight">
					<el-button size="small" type="primary">确认</el-button>
					<el-button size="small" @click="dialogVisibleAdd = false">取消</el-button>
					
				</div>
			</el-dialog>
			<!-- 详情弹窗 -->
			<el-dialog title="详情" :visible.sync="dialogVisibleDetail" append-to-body>
				<el-descriptions :column="2" border v-model="user">
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
					<el-button size="small" type="primary">确认</el-button>
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
		</div>
	</div>

</template>

<script>
	import topMenu from '../components/topMenu.vue'
	export default {
		components: {
			topMenu
		},
		data() {
			return {
				tableData: [{
					ID: '12345678',
					name: '张三',
					sex: '男',
					age: '24',
					phone: '12345678985',
					address: '北京市朝阳区红军营南路',
					email: '123456@ld.com',
					role: '管理员',
				}],
				dialogVisibleAdd: false,
				addUserform: {},
				user: {
					ID: '123456',
					name: 'krooe',
					sex: '男',
					age: '24',
					phone: '18812341234',
					address: '北京市朝阳区红军营南路',
					email: '123456@ld.com',
					unit: '草原所',
					role: '管理员',
					des: '这里是个人简介'
				},
				dialogVisibleDetail: false,
				dialogVisibleEdit: false,
				userform: {},
			}
		},
		methods: {
			handleSelectionChange() {

			},

			addInfo() {
				this.dialogVisibleAdd = true
			},
			details() {
				this.dialogVisibleDetail = true
			},
			edit() {
				this.dialogVisibleEdit = true
			},
			deleteList() {
				this.$confirm('是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
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
	.user-list {
		margin-top: 20px;
		background-color: #fff;
		padding: 20px;
		border-radius: 5px;
		box-shadow: 0 0px 5px rgb(0 0 0 / 20%);
	}

	.botanyTable {
		margin-top: 20px;
	}
</style>
