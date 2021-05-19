import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { Menu, Icon } from 'antd';
import {menuList} from '../../../config/menu_config.js'
import Logo from '../../../static/imgs/logo.png'
import './let_nav.less'

const { SubMenu,Item } = Menu;

export default class LetNav extends Component{

  createMenu = (target) => {
    return target.map((item)=>{
      if (!item.children) {
        return(
          <Item key={item.key}>
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
          defaultSelectedKeys={['/admin/home']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          //inlineCollapsed={this.state.collapsed}
        >
          {this.createMenu(menuList)}
        </Menu>
      </div>
    )
  }
}