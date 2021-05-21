import React,{Component} from 'react'
import {Redirect,Route,Switch,} from 'react-router-dom'
import {connect} from 'react-redux'
import { Layout } from 'antd';

import {createdeleteUserInfoAction} from '../../redux/action_creators/login_action.js'
import Header from './header/header.jsx'
import LetNav from './let_nav/let_nav.jsx'
import './css/admin.less'

import Home from '../../components/home/home.jsx'
import Category from '../../containers/category/category'
import Product from '../../containers/product/product'
import User from '../../containers/user/user'
import Role from '../../containers/role/role'
import Bar from '../../containers/bar/bar'
import Line from '../../containers/line/line'
import Pie from '../../containers/pie/pie'



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
  
  render() {
    //取出 redux 信息
    const { isLogin} = this.props.userInfo
    //判断是否登录
    if (!isLogin) return <Redirect to="/login" />
    else {
    return(
        <Layout className='admin'>
          <Sider className='sider'>
            <LetNav/>
          </Sider>
          <Layout>
            <Header/>
            <Content className='conter'>
              <Switch>
                <Route path='/admin/home' component={Home} />
                <Route path='/admin/prod_about/category' component={Category} />
                <Route path='/admin/prod_about/product' component={Product} />
                <Route path='/admin/user' component={User} />
                <Route path='/admin/role' component={Role} />
                <Route path='/admin/charts/bar' component={Bar} />
                <Route path='/admin/charts/line' component={Line} />
                <Route path='/admin/charts/pie' component={Pie} />
                <Redirect to='/admin/home' />
              </Switch>
            </Content>
            <Footer className='footer' >推荐使用谷歌浏览器，可以获得更佳的页面操作体验
            </Footer>
          </Layout>
        </Layout>
    )}
  }
}
   //如下代码中的所有key是控制容器组件传递给UI组件的key
   //如下代码中的所有value是控制容器组件传递给UI组件的value
export default Admin;  
