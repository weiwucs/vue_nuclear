import axios from './baseURL' // 引入域名文件
import store from "@/store";
const base = store.state.isProxy ? '/api' : ''
const api ={
    //获取所有用户
    getUser(params){
        return axios({
            method: 'get',
            url:`${base}/user`
        })
    },
    //新增用户
    postUser(params){
        return axios({
            method: 'post',
            url:`${base}/user`,
            params:params
        })
    },
    //删除用户
    deleteUser(id){
        return axios({
            method: 'delete',
            url:`${base}/user/?id=${id}`
        })
    },
    //修改用户
    patchUser(params){
        return axios({
            method: 'patch',
            url:`${base}/user`,
            params:params
        })
    },
    //登录
    postLogin(params){
        return axios({
            method: 'post',
            url:`${base}/user/login`,
            params:params
        })
    },
    //获取光学卫星列表
    getOptical_satellite(params){
        return axios({
            method: 'get',
            url:`${base}/optical_satellite`
        })
    },
    //获取雷达卫星列表
    getRadar_satellite(params){
        return axios({
            method: 'get',
            url:`${base}/radar_satellite`
        })
    },
}
export default api