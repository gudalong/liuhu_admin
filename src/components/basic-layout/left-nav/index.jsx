import React, { Component } from "react";
import { Menu, Icon } from "antd";

//withRouter是给非路由组件传递路由组件的三大属性，是高阶组件
import { Link,withRouter } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import "./index.less";
import menus from "../../../configs/menus";

const { SubMenu } = Menu;

@withRouter
class LeftNav extends Component {
  createMenus = menus => {
    return menus.map(menu => {
      if (menu.children) {
        //是二级标题
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
              </span>
            }
          >
            {menu.children.map(menu => {
              return this.createMenu(menu);
            })}
          </SubMenu>
        );
      } else {
        //是
        return this.createMenu(menu);
      }
    });
  };

   createMenu = menu => {
    return (
      <Menu.Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{menu.title}</span>
        </Link>
      </Menu.Item>
    );
  };

  openKey = (menus,pathname)=>{
    for(let index = 0; index < menus.length ; index++){
      const menu = menus[index];
      if(menu.children){
        const findOpenKey = menu.children.find((cmenu)=>{return  cmenu.path === pathname})
        if(findOpenKey){
          return menu.path
        }
      }
    }
    
  }

 
  render() {
    const pathname = this.props.location.pathname
    const openKey = this.openKey(menus,pathname)
    return (
      <div>
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1 id="logo-title">硅谷后台</h1>
        </div>

        <Menu theme="dark" defaultSelectedKeys={[pathname]} defaultOpenKeys={[openKey]} mode="inline">
          {this.createMenus(menus)}
        </Menu>
      </div>
    );
  }
}

export default LeftNav
