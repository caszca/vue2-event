// 请求接口集合
import axios from '@/utils/request'
import store from '@/store/index'

export const register = (message) => {         //注册提交
    return axios({ // 返回一个promise实例对象
        url: '/users/reg',
        method: 'POST',
        data: message
    })
}


export const login = ({ username, password }) => {    //登录提交
    return axios({
        url: '/users/login',
        method: 'POST',
        data: {
            username,
            password
        }
    })
}

export const getUserInfo = () => {     //不能加后缀API,否则检测不是一个函数，不知原因，获用户信息
    return axios({
        url: '/users/userinfo',
        /* headers: {          //传递请求头，后续api接口多次追加，避免繁琐，在axios拦截器中进行追加
            Authorization: store.state.token
        } */
    })
}


export const getMenus = () => {
    return axios({
        url: '/tablist',
        /*  headers: {
             Authorization: store.state.token       //重复
         } */
    })
}

//更新用户信息
export const updateUserInfo = (value) => {
    return axios({
        url: '/users/userinfo',
        method: 'PUT',
        data: value
        //请求头在axios拦截器里添加
    })
}

//更新头像
export const updateAvatar = (avatar) => {
    return axios({
        url: '/users/update/avatar',
        method: 'PATCH',
        data: {
            avatar
        }
    })
}

//更新用户密码
export const updatePwd = ({ old_pwd, new_pwd, re_pwd }) => {
    return axios({
        url: '/users/updatepwd',
        method: 'PATCH',
        data: {
            old_pwd,
            new_pwd,
            re_pwd
        }
    })
}

//获取所有文章分类情况
export const getArtCate = () => {
    return axios({
        url: '/cate/list',

    })
}


//添加文章分类
export const addCate = ({ cate_name, cate_alias }) => {
    return axios({
        url: '/cate/add',
        method: 'POST',
        data: {
            cate_name,
            cate_alias
        }
    })
}

//获取单个文章分类具体情况

export const getOneCate = (id) => {
    return axios({
        url: `/cate/info?id=${id}`,
    })
}


//更新文章分类信息
export const updateCate = ({ id, cate_name, cate_alias }) => {
    return axios({
        url: '/cate/info',
        method: 'PUT',
        data: {
            id, cate_name, cate_alias
        }
    })
}

//删除文章分类
export const deleteCate = (id) => {
    return axios({
        url: `/cate/del?id=${id}`,
        method: 'DELETE'

    })
}

/* const instance = axios.create({
    baseURL: "http://localhost:8001"
}) */
//发布文章,参数要的是表单对象, 不能写普通对象, axios内部会判断, 如果是表单对象, 传递的请求体会设置Content-Type: form-data与后端对应
export const loadArticle = (article) => { /* 这里又写错了，写成acticle */

    return axios({
        url: '/article/add',
        method: 'POST',
        data: article
    })
}


//获取所有文章详情
export const getAllArticle = ({ pagenum, pagesize, cate_id, state }) => {
    return axios({
        url: '/article/list',
        params: {
            pagenum, pagesize, cate_id, state
        }
    })
}

//获取所有文章数量
export const getAllArticleNum = () => {
    return axios({
        url: "/article/all"
    })
}

//获取单个文章的详情
export const getOneArticle = (id) => {
    return axios({
        url: `/article/info?id=${id}`,

    })
}

//删除文章  
export const deleteArt = (id) => {
    return axios({
        url: `/article/info?id=${id}`,
        method: 'DELETE',

    })
}
//获取每日新增文章数量
export const getNewArticleNum = () => {
    return axios({
        url: "/article/new"
    })
}

//获取分类文章各自数量
export const getCateArticleNum = () => {
    return axios({
        url: "/article/cateNum"
    })
}

//获取每月文章量
export const getMonthNum = () => {
    return axios({
        url: "/article/monthNum"
    })
}