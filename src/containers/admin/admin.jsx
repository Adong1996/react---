import React,{Component} from 'react'
import {connect} from 'react-redux'

 class Admin extends Component{
  render() {
    return(
      <div>
        Admin
      </div>
    )
  }
}

   //如下代码中的所有key是控制容器组件传递给UI组件的key
   //如下代码中的所有value是控制容器组件传递给UI组件的value
export default connect(
  state => ({uerInfo:state.uerInfo}), 
  {}
)(Admin);  