import myAios from './myAxios.js'
import jsonp from 'jsonp'
import {message} from 'antd'
import {BASE_URL, WEATHER_Ak, CTIY} from '../config/index.js' 

//登录请求
export const reqLogin = (username,password) => myAios.post(`${BASE_URL}/login`,{username,password})
//分类类表请求
export const reqCategoryList = () => myAios.get(`${BASE_URL}/manage/category/list`)
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
