import axios from 'axios'
import {message} from 'antd'
import NProgress from 'nprogress'
import qs from 'querystring'

import 'nprogress/nprogress.css'

const instance = axios.create({
  timeout: 5000,
});

//请求拦截器
instance.interceptors.request.use(function (config) {
  NProgress.start()
  let {method,data} = config
  if(method.toLowerCase() === 'post'){
    if(data instanceof Object){
      config.data = qs.stringify(data)
    }
  }
  return config;
});
//响应拦截器
instance.interceptors.response.use(
  //成功拦截
  function (response) {
    NProgress.done()
  return response.data;
  //失败拦截
}, function (error) {
  message.error(error.message,1)
  return new Promise(() => {});
});

export default instance