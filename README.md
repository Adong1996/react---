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
    <Route path='' component={}>
    <Redirect to='' />
  </Switch>
动态跳转路由
import {Link,NavLink} from 'react-router-dom'
有样式添加用NavLink，无用Link
<Link to=''>
  
</Link>
(在antd中使用路由跳转而保持样式不塌陷则需)
<Item>(antd组件)
  <Link to=''>
  
   </Link>
</Item>

在非路由组件中，要使用路由组件的api
引用 withRouter from 'react-router-dom'
withRouter（） 高阶组件

 4.接口测试
 demo = async() => {
    let result = await reqCategoryList()
    console.log(result);
  }
 
 使用UI库  antd(组件库(样式无法从父级继承)) nprogress(进度条) querystring(json 转 urlencoded形式) screenfull(网页全屏) dayjs(时间) jsonp(解决跨域)

 5.跨域问题
  1.搭建代理服务器
  2.cors
  后端配置：Access-Control-Allow-Origin
  3.jsonp
  原理；借助了 <script>标签解决天然跨域或不受同源策略的限制 
  仿佛是前端定义函数，后端调用函数，从而把数据带回来的过程
   (1).构建一个<script>标签
   （2）.指定标签src属性
   （3）.将标签放在页面时
   （4）.得到响应数据当js语法执行
   (5).触发demo函数
6. promise 使用  
要把异步回调函数里带回的值交给它外层方法的返回值
回调地狱
