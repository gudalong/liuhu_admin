import React, { Component } from "react";
import { Layout} from "antd";
// import { Breadcrumb } from 'antd'
import LeftNav from "./left-nav";
import checkLogin from '../../containers/with-check-login'
import HeaderMain from './header-main'

const { Header, Content, Footer, Sider } = Layout;

@checkLogin
 class BasicLayout extends Component {
  state = {
    collapsed: false,
    isDisplay:true
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ 
      collapsed ,
      isDisplay:!this.state.isDisplay
    });
     
    // this.h1logo.classList.toggle("none");
  };

  componentDidMount() {
    this.h1logo = document.getElementById("logo-title");
  }

  render() {
    const {collapsed , isDisplay} = this.state
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}  
          onCollapse={this.onCollapse}


          
        >
          <LeftNav isDisplay={isDisplay} />
        </Sider>

        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} > 
          <HeaderMain/>
          </Header>
          <Content style={{ margin: "70px 16px 0" }}>
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default BasicLayout