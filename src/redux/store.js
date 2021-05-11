//最核心的管理者
//reudx 中引入createrStore ，用于创建最核心的store对象
import {createStore, applyMiddleware} from 'redux'
//引入reducer
import reducers from './reducers/index.js'
//引入 redux-thunk
import thunk from 'redux-thunk'
//引入 redux-devtools-extension,  用于支持 redux 开发者调试工具的运行
import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
