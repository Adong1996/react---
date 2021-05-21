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
