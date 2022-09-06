import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/components/Main'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'index',
		component: () => import('../views/index.vue'),
		redirect: '/login',
		children: [{
			path: 'home',
			name: 'home',
			component: () => import('../views/home.vue')
		},{
			path: 'dataSearch',
			name: 'dataSearch',
			component: () => import('../views/dataSearch.vue')
		}]
    },
    {
		path: '/login',
		name: 'login',
		component: () => import( '../views/login.vue')
	},{
		path: '/dataManage',
		name: 'dataManage',
		component: () => import('../views/dataManage.vue')
	},{
		path: '/userManage',
		name: 'userManage',
		component: () => import('../views/userManage.vue')
	}
]

const router = new VueRouter({
    // mode:'history',
    routes
})

export default router
