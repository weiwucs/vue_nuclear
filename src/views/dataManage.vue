<!-- 数据管理 -->
<template>
	<div>
		<topMenu></topMenu>
		<div class="dataMenagement">
			<div class="data-left-list">
				<dataManageLeftMenu></dataManageLeftMenu>
			</div>
			<div class="data-left-con">
				<keep-alive>
				  <router-view></router-view>
				</keep-alive>
			</div>
		</div>
	</div>
	
</template>

<script>
	import topMenu from '../components/topMenu.vue'
	import dataManageLeftMenu from '../components/dataManage/dataManageLeftMenu.vue'
	
	export default {
		components: { topMenu,dataManageLeftMenu},
		data(){
			return{
				
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
	.dataMenagement{
		display: flex;
	}
	.data-left-list{
		width:200px;
		height: calc(100vh - 60px);
		margin-top: 60px;
		background-color: rgba(23, 49, 71, 1);
	}
	.data-left-con{
		width:calc(100vw - 200px);
		height: calc(100vh - 60px);
		margin-top: 60px;
		padding:20px;
		background-color: #f3f6fb;
	}
</style>