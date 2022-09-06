import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/components/Main'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'index',
		component: () => import('../views/index.vue'),
		// redirect: '/login',
		// children: [{
		// 	path: 'home',
		// 	name: 'home',
		// 	component: () => import('../views/index.vue')
		// }]
    },
    {
		path: '/login',
		name: 'login',
		component: () => import( '../views/login.vue')
	}
]

const router = new VueRouter({
    // mode:'history',
    routes
})

export default router
