import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { Layout } from 'antd';

import {createdeleteUserInfoAction} from '../../redux/action_creators/login_action.js'
import {reqCategoryList} from '../../api/index.js'
import Header from './header/header.jsx'
import './css/admin.less'

const {Footer, Sider, Content } = Layout;

@connect(
  state => ({userInfo:state.userInfo}), 
  {deleteUserInfo:createdeleteUserInfoAction}
)
class Admin extends Component{
  componentDidMount(){
  }
  //退出登录回调
  logout = () => {
    //触发 redux 删除所保留的用户信息
    this.props.deleteUserInfo()
  }
  //接口测试
  demo = async() => {
    let result = await reqCategoryList()
    console.log(result);
  }
  render() {
    //取出 redux 信息
    const { isLogin} = this.props.userInfo
    //判断是否登录
    if (!isLogin) return <Redirect to="/login" />
    else {
      <button onClick={this.logout} >退出登录</button>
    return(
        <Layout className='admin'>
          <Sider className='sider'>Sider</Sider>
          <Layout>
            <Header/>
            <Content className='conter'>Content</Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
    )}
  }
}
   //如下代码中的所有key是控制容器组件传递给UI组件的key
   //如下代码中的所有value是控制容器组件传递给UI组件的value
export default Admin;  
