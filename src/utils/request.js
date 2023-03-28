// 配置请求借口的基地址
import axios from 'axios'
import router from '@/router/index'
import store from '@/store/index'

export const baseURL = 'http://8.130.53.226:8001'
axios.defaults.baseURL = baseURL


//请求拦截器
axios.interceptors.request.use((config) => {     //axios拦截器，追加请求头
    if (store.state.token) {
        config.headers.Authorization = store.state.token
        console.log(store.state.token)
    }
    return config
})


//响应拦截器
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {   //token过期
            store.commit('updateToken', '')
            store.commit('updateUser', '')
            router.push('/log')
            return new Promise(() => { })

        }
    }
)
export default axios
