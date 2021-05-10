import React,{Component} from 'react'
import { connect } from 'react-redux'

 class Admin extends Component{
  render() {
    return(
      <div>
        Admin
      </div>
    )
  }
}

export default connect(
   //如下代码中的所有key是控制容器组件传递给UI组件的key
   //如下代码中的所有value是控制容器组件传递给UI组件的value
  state => ({uersInfo:state.uerInfo},
    {}
  ) 
)(Admin)   