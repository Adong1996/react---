## React项目每天任务表

### day01任务：
* 1.使用create-react-app创建基于react脚手架应用（最好精简一下脚手架）
* 2.引入antd，完成按需引入，自定义主题
* 3.login静态页面（不使用atnd的任何组件）
* 4.login的Form表单（不加校验，只是使用静态的Form）
* 5.login的Form表单（给用户名加校验，声明式验证）
* 6.login的Form表单（给密码加校验，自定义验证）
* 7.理解好Form.create()(Login)
* 8.高阶组件、高阶函数

### day02任务
1.装饰器语法：
@demo
class Myclass {}

function demo(target) {
  target.a = 1;
}

-----------------------
class Myclass {}
function demo (target) {
  target.a = 1;
}
Myclass = demo(Myclass)

2.如何鉴别用户是否登录？
前期的用 
cookie
cookie-session
现在：
token:

 3. react -router 使用
 创建路由跳转组件
 import {Redirect, Route, Switch} from 'react-router-dom'
 引入组件，多个路由使用Switch 默认重定向 Redirect
 <Switch>
  <Route path='' component=''>
  <Redirect to='' />
 </Switch>
 


