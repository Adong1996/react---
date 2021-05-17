import {combineReducers} from 'redux'
import loginReducer from './login_recuder.js'

export default combineReducers({
  //该对象里的key 决定着store 里保存该状态的key
  //该对象里的value 决定着store 里保存该状态的value
  userInfo: loginReducer
})