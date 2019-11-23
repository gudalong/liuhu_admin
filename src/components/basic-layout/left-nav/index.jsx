import React, { Component } from "react";
import { Menu, Icon } from "antd";
import logo from "../../../assets/img/logo.png";
import "./index.less";

const { SubMenu } = Menu;

export default class LeftNav extends Component {
  render() {
    return (
      <div>
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1 id="logo-title">硅谷后台</h1>
        </div>

        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <Icon type="home" theme="twoTone" />
            <span>首页</span>
          </Menu.Item>

          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="appstore" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="6">
              <Icon type="highlight" theme="twoTone" />
              <span>美妆美彩</span>
            </Menu.Item>

            <Menu.Item key="7">
              <Icon type="bank" theme="twoTone" />
              <span>金融理财</span>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="2">
            <Icon type="user" />
            <span>用户管理</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="safety-certificate" theme="twoTone" />
            <span>权限管理</span>
          </Menu.Item>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="rocket" theme="twoTone" />
                <span>图形图表</span>
              </span>
            }
          >
            <Menu.Item key="7">
              <Icon type="bar-chart"/> 
              <span>柱形图</span>
            </Menu.Item>
            <Menu.Item key="8">
              <Icon type="line-chart" />
              <span>折线图</span>
            </Menu.Item>
            <Menu.Item key="9">
              <Icon type="pie-chart" />
              <span>饼状图</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
