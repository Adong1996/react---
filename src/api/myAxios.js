import axios from 'axios'
import {message} from 'antd'
import NProgress from 'nprogress'
import qs from 'querystring'

import 'nprogress/nprogress.css'

import store from '../redux/store.js'
import {createdeleteUserInfoAction} from '../redux/action_creators/login_action.js'
const instance = axios.create({
  timeout: 5000,
});

//请求拦截器
instance.interceptors.request.use(function (config) {
  //进度条开始
  NProgress.start()
  //从redux 保存 token 信息
  const {token} = store.getState().userInfo
  //向请求头中添加 token 用于校验身份
  if(token) config.headers.Authorization = 'atguigu_' + token
  //从配置中获取 method,data 
  let {method,data} = config
  //若是 post 请求
  if(method.toLowerCase() === 'post'){
    //若传递过来的参数是对象，转化成 urlencoded形式
    if(data instanceof Object){
      config.data = qs.stringify(data)
    }
  }
  return config;
});
//响应拦截器
instance.interceptors.response.use(
  //成功拦截
  (response) => {
    //进度条结束
    NProgress.done()
  return response.data;
  
  //失败拦截
}, (error) => {
  //进度条结束
  NProgress.done()
  console.log(error);
  if(error.response.status === 401 ) {
    store.dispatch(createdeleteUserInfoAction())
    message.error('登录信息失效')
  }else{
    message.error(error.message,1)
  }
  return new Promise(() => {});
});

export default instance