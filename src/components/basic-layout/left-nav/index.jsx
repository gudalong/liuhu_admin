import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import "./index.less";
import menus from "../../../configs/menus";

const { SubMenu } = Menu;

export default class LeftNav extends Component {
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
              return (
                this.createMenu(menu)
              );
            })}
          </SubMenu>
        );
      } else {
        //是
        return (
         
           this.createMenu(menu)
         
        );
      }
    });
  };

  createMenu = menu => {
    return <Menu.Item key={menu.path}>
      <Link to={menu.path}>
        <Icon type={menu.icon}/>
        <span>{menu.title}</span>
      </Link>
    </Menu.Item>;
  };
  render() {
    return (
      <div>
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1 id="logo-title">硅谷后台</h1>
        </div>

        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {this.createMenus(menus)}
        </Menu>
      </div>
    );
  }
}
