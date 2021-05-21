import React,{Component} from 'react'
import { Form,Input, Button, Icon, message } from 'antd';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {createsaveUserInfoAction} from '../../redux/action_creators/login_action.js'
import {reqLogin} from '../../api'
import logo from './imgs/logo.png'
import './css/css.less'

const {Item} = Form

@connect(
  state => ({
    isLogin: state.userInfo.isLogin
  }),
  {
    saveUserInfo:createsaveUserInfoAction
  }
)
@Form.create()
class Login extends Component{
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.props.form.getFieldValue());
    this.props.form.validateFields(async(err, values) => {
      let {username, password} = values
      if (!err) {
        /* reqLogin(username,password)
        .then((result) => {
          console.log(result);
        })
        .catch((reason) => {

        }) */
        let result = await reqLogin(username, password)
        let {status,msg,data} = result
        if(status === 0){
          //存入 redux 信息
          this.props.saveUserInfo(data)
          //跳转admin
          this.props.history.replace('/admin')
        }else{
          message.warning(msg)
        }
      }else{
        message.error('表单输入有误，请检查！')
      }
    });
  };
  pwdValidator = (rule, value, callback) => {
    if(!value) {
      callback('用户名必须输入!')
    }else if(value.length < 4){
      callback('用户名最小4位!')
    }else if(value.length > 12) {
      callback('用户名最大12位!')
    }else if(!(/^\w+$/).test(value)) {
      callback('用户名必须是字母，数字和下划线!')
    }else{
      callback()
    }

  }
  render() {
    const isLogin = this.props.isLogin
    if (isLogin) {
      return <Redirect to='/admin'/>
    } else {
      const { getFieldDecorator } = this.props.form;  
    return(
      <div className='login'>
        <header>
          <img src={logo} alt="LOGIN"/>
          <h1>商品管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
            {getFieldDecorator('username', {
            rules: [
              { required: true, message: '用户名必须输入!' },
              { min: 4, message: '用户名最小4位!'},
              { max: 12, message: '用户名最大12位!'},
              { pattern: /^\w+$/, message: '用户名必须是字母，数字和下划线!'}],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
                
            </Item>
            <Item>
            {getFieldDecorator('password', {
            rules: [
              {validator: this.pwdValidator}
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Item>
        </Form>  
        </section>
      </div>
    )
    }
    
  }
}
export default Login
