import axios from 'axios'

const service = axios.create({
    baseURL: 'http://192.168.1.113:8080/nuclear',  //请求的地址
    // timeout: 5000  //访问超时的时间
});

export default service;