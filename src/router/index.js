import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Main from '@/components/Main'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index
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
