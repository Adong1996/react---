import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Admin extends Component{
  componentDidMount(){
    console.log(this.props);
  }
  render() {
    const {user, token, isLogin} = this.props.userInfo
    if (!isLogin) {
      return <Redirect to="/login" />
    }
    else 
    return(
      <div>我是admin组件</div>
    )
  }
}
   //如下代码中的所有key是控制容器组件传递给UI组件的key
   //如下代码中的所有value是控制容器组件传递给UI组件的value
export default connect(
  state => ({userInfo:state.userInfo}), 
  {}
)(Admin);  