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

Switch 只能路由模糊匹配
例如：
同一路由组件跳转
admin/pro_about/product 被 admin/pro_about/product/detail 包裹时
需要在admin/pro_about/product 后加 exact（精确匹配）

动态跳转路由
import {Link,NavLink} from 'react-router-dom'
有样式添加用NavLink，无用Link
<Link to=''>
  
</Link>(不能直接加onClick(不能加小括号但需要传参则 ()=>{})的点击事件)
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
 
 使用UI库  
 antd(v3)
 样式分布，默认把屏幕分为24列
  (组件库(样式无法从父级继承)--设置默认选择的尽量不用选择带defalut,一般来说带有defalut...(只能设置一次)什么的就默认有个不带defalut...可以设置多次（但也有例外）) 
  select onChange事件传的值是 value
  input onChange事件传的值是 event.target.value
  图片上传
  antd-upload 图片上传 默认上传方式 post
  
 nprogress(进度条) querystring(json 转 urlencoded形式) screenfull(网页全屏) dayjs(时间) jsonp(解决跨域)

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

7.react生命周期函数
（旧）
初始化
  触发条件：ReactDOM.render(<>)
    constructor()
    componentWillMount()
    render():提供虚拟DOM，可能会调用多次（1+n）
    componentDidMount():启动定时器，发送Ajax 请求，只执行一次
更新
  触发条件：this.setState({})
    componentWillUpdate()
    render()
    componentDidUpdate()
卸载
  触发条件：ReactDOM.unmountComponentAtNode()
    componentWillUnmount():收尾工作，例如：清除定时器，只执行一次

（新）即将废弃的钩子 componentWillMount(),componenWillReceProps(),componentWillUpdate()

getDervedStateFromProps()-- 取代了 componentWillMount(),componentWillUpdate()
可接受参数而改变状态 
static getDerivedStateFromProps(props,state){
  return props
}
getSnapshotBeforeUpdate()--介于componentDidUpdate 和 render 之间


inital render
componentDidMount(){
  this.setState({a:100})
  console.log(this.state)//underful
}


this.setState(),是异步的，即：更新状态后，不会立即生效
如果想立即调用可以为其添加一方法
componentDidMount(){
  this.a = 100
  this.setState({a:100})
  console.log(this.state)//underful
}
但在老版本react中，只有在componentDidMount中this.setState(),是异步的,在自己定义的 deom = () => {} 中是同步的
现版本中不管在哪this.setState(),都是异步的

react -- 原理：
初始化：
创建虚拟DOM数（一般js对象）用于文档碎片技术 -> 映射出真实DOM 绘制界面显示
更新界面

8.分页
  前端分页
    一次性返回所有数据，有前端人员进行数据的切割，整理，划分页数
    当数据量足够大时，会产生页面卡顿或浏览器‘假死’
  后端分页
    返回的是一部分数据，需要请求时指明：每页显示多少条，你要哪一页，交由服务器进行数据切割
    后台需要明确； A:每页显示多少条 B:你要哪一页，同时后台会返回数据一共有多少个，用于交给前端显示

9.受控组件(随着用户的输入，而维护状态) onChange 事件
(触发事件 就能得到其状态)

10.绑定方法尽量不要动态的绑定

11.存入详情信息数据的时候，里面带有标签时,使用 dangerouslySetInnerHTML={{__html:数据信息}}

12.富文本编译器 --wysiwyg   

13.react-redux 
只能保存静态的状态
14.
当 子组件 的方法传递 父组件 用时
可以 ref 标识
this.refs.wall.(子组件的方法)--(this.refs.wall)类的实例
<Item>
  <Wall ref='wall'></Wall>(类组件)
</item>

14.jquery 库 ztree,easyUI

15.数组扁平化？？

16.array.some()

17.数据可视化 
echarts
echarts-for-react
