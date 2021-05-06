import React,{Component} from 'react'
import { Form,Input, Button, Icon } from 'antd';


import logo from './imgs/logo.png'
import './css/css.less'

const {Item} = Form

class Login extends Component{
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      
      if (!err) {
        alert('向服务器发送请求')
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
export default Form.create()(Login);
