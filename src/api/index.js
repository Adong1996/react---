import myAios from './myAxios.js'
import {BASE_URL} from '../config/index.js' 

//登录请求
export const reqLogin = (username,password) => myAios.post(`${BASE_URL}/login`,{username,password})
//分类类表请求
export const reqCategoryList = () => myAios.get(`${BASE_URL}/manage/category/list`)