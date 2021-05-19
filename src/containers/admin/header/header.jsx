import React,{Component} from 'react'
import {Icon,Button,Modal} from 'antd'
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import dayjs from 'dayjs'

import {createdeleteUserInfoAction} from '../../../redux/action_creators/login_action.js'
import './header.less'  
import { reqWeather } from '../../../api/index.js'

const { confirm } = Modal;

@connect(
  state => ({userInfo:state.userInfo}),
  {deleteUser:createdeleteUserInfoAction}
)
@withRouter
class Header extends Component {

  state = {
    isFull: false,
    //显示时间
    data: dayjs().format('YYYY-MM-DD/HH:mm:ss-') 

  }
  componentDidMount() {
    //给screenfull绑定监听
    screenfull.on('change', () => {
      let isFull = !this.state.isFull
    this.setState({isFull})
    });
    this.timeID = setInterval(() => {
      this.setState({data:dayjs().format('YYYY-MM-DD/HH:mm:ss-')})
    }, 1000);
    //请求天气信息
  //  this.getWeater()
  }

  componentWillUnmount(){
    //清除更新时间定时器
    clearInterval(this.timeID)
  }
  //请求天气回调
  getWeater = async() => {
    let result = await reqWeather()
    console.log(result);
    //保存组件状态中
  }
  //退出回调
  loginOut = () => {
    let {deleteUser} = this.props
    confirm({
      title: '确认要退出吗?',
      content: '若退出要重新登录',
      okText: '确认',
      cancelText: '取消',
      onOk:() => {
        deleteUser()
      },
      onCancel() {},
    });
  }
  //切换全面按钮的回调
  fullScreen = () => {
    screenfull.toggle()
  }
  render() {
    let {isFull, data} = this.state
    let {username} = this.props.userInfo.user
    return(
      <header>
        <div className='header-top'>
          <Button size={'small'} onClick={this.fullScreen} >
          <Icon type={isFull ? "fullscreen-exit" : "fullscreen"} />
          </Button>
          <span className='username'>欢迎{username}</span>
          <Button type='link' onClick={this.loginOut}>退出登录</Button>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>
            {this.props.location.pathname}
          </div>
          <div className='header-bottom-rigth'>
            {data}
            <img src="" alt="" />
            晴 温度 2~5
          </div>
        </div>
      </header>
    )
  }
}
export default Header