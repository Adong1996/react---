import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';
import {connect} from 'react-redux'
import {createSaveTitleAction} from '../../../redux/action_creators/menu_action.js'
import {menuList} from '../../../config/menu_config.js'
import Logo from '../../../static/imgs/logo.png'
import './let_nav.less'

const { SubMenu,Item } = Menu;
@connect(
  state =>({}),
  {
    saveTitle:createSaveTitleAction
  }
)
@withRouter
class LetNav extends Component{
  

//创建菜单的函数
  createMenu = (target) => {
    return target.map((item)=>{
      if (!(item.children instanceof Array)) {
        return(
          <Item key={item.key} onClick={()=>(this.props.saveTitle(item.title))} >
            <Link to={item.path}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      }else{
        return(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.createMenu(item.children)}
          </SubMenu>
        )
      }
    })
  }
  render() {
    return(
      <div>
        <header className='let_nav'>
          <img src={Logo} alt="logo" />
          <h1>商品管理系统</h1>
        </header>
        <Menu
          selectedKeys={this.props.location.pathname.indexOf('product') !== -1 ? 'product' : this.props.location.pathname.split('/').reverse()[0]}
          defaultOpenKeys={this.props.location.pathname.split('/').slice(2)}
          mode="inline"
          theme="dark"
        >
          {this.createMenu(menuList)}
        </Menu>
      </div>
    )
  }
}

export default LetNav