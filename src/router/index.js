import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import About from '../views/About.vue'
import Main from '@/components/Main'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/about',
        name: 'About',
        component: About
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },{
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
