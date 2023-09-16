// 请求接口集合
import { edRequest } from "@/utils/request/index";

export const register = (message) => {
  //注册提交
  return edRequest.post({
    // 返回一个promise实例对象
    url: "/users/reg",

    data: message,
  });
};

export const login = ({ username, password }) => {
  //登录提交
  return edRequest.post({
    url: "/users/login",

    data: {
      username,
      password,
    },
  });
};

export const getUserInfo = () => {
  //不能加后缀API,否则检测不是一个函数，不知原因，获用户信息
  return edRequest.get({
    url: "/users/userinfo",
    /* headers: {          //传递请求头，后续api接口多次追加，避免繁琐，在edRequest拦截器中进行追加
            Authorization: store.state.token
        } */
  });
};

//获取每日新增日志数量
export const getNewArticleNum = () => {
  return edRequest.get({
    url: "/article/new",
  });
};

//获取分类日志各自数量
export const getCateArticleNum = () => {
  return edRequest.get({
    url: "/article/cateNum",
  });
};

//获取每月日志量
export const getMonthNum = () => {
  return edRequest.get({
    url: "/article/monthNum",
  });
};

//获取不同心情日志
export const getHumorNum = () => {
  return edRequest.get({
    url: "/article/humor",
  });
};

export const getMenus = () => {
  return edRequest.get({
    url: "/tablist",
  });
};

//更新用户信息
export const updateUserInfo = (value) => {
  return edRequest.put({
    url: "/users/userinfo",

    data: value,
    //请求头在edRequest拦截器里添加
  });
};

//更新头像
export const updateAvatar = (avatar) => {
  return edRequest.patch({
    url: "/users/update/avatar",

    data: {
      avatar,
    },
  });
};

//更新用户密码
export const updatePwd = ({ old_pwd, new_pwd, re_pwd }) => {
  return edRequest.patch({
    url: "/users/updatepwd",

    data: {
      old_pwd,
      new_pwd,
      re_pwd,
    },
  });
};

//获取所有日志分类情况
export const getArtCate = () => {
  return edRequest.get({
    url: "/cate/list",
  });
};

//添加日志分类
export const addCate = ({ cate_name, cate_alias }) => {
  return edRequest.post({
    url: "/cate/add",

    data: {
      cate_name,
      cate_alias,
    },
  });
};

//获取单个日志分类具体情况

export const getOneCate = (id) => {
  return edRequest.get({
    url: `/cate/info?id=${id}`,
  });
};

//更新日志分类信息
export const updateCate = ({ id, cate_name, cate_alias }) => {
  return edRequest.put({
    url: "/cate/info",

    data: {
      id,
      cate_name,
      cate_alias,
    },
  });
};

//删除日志分类
export const deleteCate = (id) => {
  return edRequest.delete({
    url: `/cate/del?id=${id}`,
  });
};

//添加语言分类
export const addLangCate = ({ lang_name, lang_use }) => {
  return edRequest.post({
    url: "/langCate/add",

    data: {
      lang_name,
      lang_use,
    },
  });
};

//获取所有语言分类情况
export const getLangCate = () => {
  return edRequest.get({
    url: "/langCate/list",
  });
};

//获取单个语言分类具体情况
export const getOneLangCate = (id) => {
  return edRequest.get({
    url: `/langCate/info?id=${id}`,
  });
};

//更新语言分类信息
export const updateLangCate = ({ id, lang_name, lang_use }) => {
  return edRequest.put({
    url: "/langCate/info",

    data: {
      id,
      lang_name,
      lang_use,
    },
  });
};

//删除日志分类
export const deleteLangCate = (id) => {
  return edRequest.delete({
    url: `/langCate/del?id=${id}`,
  });
};

//发布日志,参数要的是表单对象, 不能写普通对象, edRequest内部会判断, 如果是表单对象,
//传递的请求体会设置Content-Type: form-data与后端对应
export const loadArticle = (article) => {
  /* 这里又写错了，写成acticle */

  return edRequest.post({
    url: "/article/add",
    data: article,
  });
};

//获取所有日志详情
export const getAllArticle = ({ pagenum, pagesize, cate_id, state }) => {
  return edRequest.get({
    url: "/article/list",
    params: {
      pagenum,
      pagesize,
      cate_id,
      state,
    },
  });
};

//获取所有日志数量
export const getAllArticleNum = () => {
  return edRequest.get({
    url: "/article/all",
  });
};

//获取单个日志的详情
export const getOneArticle = (id) => {
  return edRequest.get({
    url: `/article/info?id=${id}`,
  });
};

//删除日志
export const deleteArt = (id) => {
  return edRequest.delete({
    url: `/article/info?id=${id}`,
  });
};
