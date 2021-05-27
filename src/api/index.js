import myAios from './myAxios.js'
import jsonp from 'jsonp'
import {message} from 'antd'
import {BASE_URL, WEATHER_Ak, CTIY} from '../config/index.js' 

//登录请求
export const reqLogin = (username,password) => myAios.post(`${BASE_URL}/login`,{username,password})

//百度天气接口请求(jsonp)
export const reqWeather = () => {
  return new Promise((reslove)=>{
    jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${CTIY}&output=json&ak=${WEATHER_Ak}`,(err,data)=>{
    if(err){
      message.error('请求天气失败，请联系管理员')
      return new Promise(()=>{})
    }else{
      const {daypictureUrl,temerature,weather} = data.results[0].weather_data[0]
      let weatherObj = {daypictureUrl,temerature,weather}
      reslove(weatherObj)
    }
  })
  })
}
//分类列表请求
export const reqCategoryList = () => myAios.get(`${BASE_URL}/manage/category/list`)
//添加分类的请求
export const reqAddCategory = ({categoryName}) => myAios.post(`${BASE_URL}/manage/category/add`,{categoryName})
//更新分类的请求
export const reqUndateCategory = ({categoryId,categoryName}) => myAios.post(`${BASE_URL}/manage/category/update`,{categoryId,categoryName})
//获取商品列表
export const reqProductList = (pageNum,pageSize) => myAios.get(`${BASE_URL}/manage/product/list`,{params:{pageNum,pageSize}})
//更新商品状态的列表
export const reqUpdateStatus = (_id,status) => myAios.post(`${BASE_URL}/manage/product/updateStatus`,{_id,status})
//搜索商品列表
export const reqSearchProduct = (pageNum,pageSize,searchType,keyWord) => myAios.get(`${BASE_URL}/manage/product/search`,{params:{pageNum,pageSize,[searchType]:keyWord}})
//根据商品ID获取商品
export const reqPorductId = (productId) => myAios.get(`${BASE_URL}/manage/product/info`,{params:{productId}})
//删除图片
export const reqImgDelete = (name) => myAios.post(`${BASE_URL}/manage/img/delete`,{name})
//添加商品
export const reqPorductAdd = ({categoryList,name,desc,price,detail,imgs}) => myAios.post(`${BASE_URL}/manage/product/add`,{categoryId:categoryList,name,desc,price,detail,imgs})
//更新商品
export const reqPorductUpdate = ({_id,categoryId,name,desc,price,detail,imgs}) => myAios.post(`${BASE_URL}/manage/product/update`,{_id,categoryId,name,desc,price,detail,imgs})
// 请求所有角色列表
export const reqRoleList = () => myAios.get(`${BASE_URL}/manage/role/list`)
//请求添加角色
export const reqRoleAdd = (roleName) => myAios.post(`${BASE_URL}/manage/role/add`,{roleName})
//给角色授权
export const reqRoleUpdate = (roleObj) => myAios.post(`${BASE_URL}/manage/role/update`,{...roleObj,auth_time:Date.now()})
//获取所有用户列表
export const reqUserList = () => myAios.get(`${BASE_URL}/manage/user/list`)
//请求添加用户
export const reqAddUser = ({username,password,phone,email,role_id}) => myAios.post(`${BASE_URL}/manage/user/add`,{username,password,phone,email,role_id})
//删除用户
export const reqUserDelete = (userId) => myAios.post(`${BASE_URL}/manage/user/delete`,{userId})
////用户修改
export const reqUserUpdate = ({_id,username,phone,email,role_id}) => myAios.post(`${BASE_URL}/manage/user/update`,{_id,username,phone,email,role_id})


