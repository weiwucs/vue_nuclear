<!-- 数据左侧菜单 -->
<template>
    <div>
        <el-menu class="el-menu-vertical-demo" :default-active="$route.path" :router="true">
            <template v-for="menu in menuList">
                <el-submenu v-if="menu.children.length" :key="menu.path" :index="menu.path">
                    <template slot="title">
                        <span>{{ menu.title }}</span>
                    </template>
                    <el-menu-item :index="item.path" :route="{path:item.path}" v-for="item in menu.children">
                        <template slot="title">
                            <span>{{ item.title }}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else-if="menu.children.length == 0" :index="menu.path" :route="{path:menu.path}">
                    <template slot="title">
                        <span>{{ menu.title }}</span>
                    </template>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                menuList: [
                    {
                        name: 'guangxueData',
                        title: '光学卫星数据',
                        path: '/dataManage/guangxue',
                        children: [{
                            name: 'GF',
                            title: '高分系列（GF）',
                            path: '/dataManage/dataContent?data=GF',
                            children: []
                        }, {
                            name: 'ZY',
                            title: '资源系列（ZY）',
                            path: '/dataManage/dataContent?data=ZY',
                            children: []
                        }],
                    },
                    {
                        name: 'leidaData',//对应index
                        title: '雷达卫星数据',
                        path: '/dataManage/leida',//router-link跳转路由
                        children: [
                            {
                                name: 'GF3',
                                title: '高分三号',
                                path: '/dataManage/dataContent?data=GF3',
                                children: []
                            }
                        ]
                    },
                    {
                        name: 'otherData',//对应index
                        title: '其他数据',
                        path: '/dataManage/dataContent?data=other',//router-link跳转路由
                        children: []
                    }
                ]
            }
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
</style>
