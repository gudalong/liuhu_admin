import React, { Component } from "react";
import { Modal, Button, Icon } from "antd";
import screenfull from "screenfull";
import { connect } from "react-redux";
import { removeItem } from "../../../utils/storage";
import { removeUserSuccess } from "../../../redux/action-creators/user";
import store from "../../../redux/store";
import { withRouter } from "react-router-dom";
import menus from "../../../configs/menus";
import updateTime from "../../../utils/time";
import "./index.less";

@withRouter
@connect(state => ({ username: state.user.user.username }), {
  removeUserSuccess
})
class HeaderMain extends Component {
  state = {
    isScreenFull: false,
    time: updateTime(Date.now())
  };

  toggleScreen = () => {
    //切换全屏
    screenfull.toggle();
  };

  //单独定义一个函数，用来被绑定和解绑
  screenFn = () => {
    this.setState({
      isScreenFull: !this.state.isScreenFull
    });
  };

  timer = "";
  componentDidMount = () => {
    //触发全屏时就执行此函数
    screenfull.on("change", this.screenFn);
    this.timer = setInterval(() => {
      this.setState({
        time: updateTime(Date.now())
      });
    }, 1000);
  };

  componentWillUnmount = () => {
    //万一元素不存在的时候就要解绑函数
    screenfull.off("change", this.screenFn);
    clearInterval(this.timer);
  };

  showConfirm = () => {
    Modal.confirm({
      title: "确定要退出登录吗?",
      content: "请再想一想。客官~~",
      okText: "确定",
      cancelText: "再想想",
      onOk: () => {
        //退出，清除数据（redux ， localstorage），在转到'/login'
        removeItem("user");
        store.dispatch(this.props.removeUserSuccess());
        this.props.history.replace("/login");
      },
      onCancel: () => {
        //不做任何操作
      }
    });
  };

  //头部标题函数。返回的是所点击的左侧的标题
  headerTitle = (menus, pathname) => {
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      if (menu.children) {
        let findTitle = menu.children.find(cmenu => {
          // return cmenu.path === pathname;
          //因为有了三级路由，所以更改成了以下匹配逻辑
          return pathname.startsWith(cmenu.path);

        });
        if (findTitle) {
          return findTitle.title;
        }
      } else {
        if (menu.path === pathname) {
          return menu.title;
        } 
      }
    }
  };

  render() {
    const { username } = this.props;
    const pathname = this.props.location.pathname;
    return (
      <div className="header-main">
        <div className="header-main-top">
          <Button size="small" onClick={this.toggleScreen}>
            <Icon
              type={this.state.isScreenFull ? "fullscreen-exit" : "fullscreen"}
            />
          </Button>
          <Button size="small" className="lang-btn">
            Enligth
          </Button>
          <span>欢迎，{username}</span>
          <Button type="link" onClick={this.showConfirm}>
            退 出
          </Button>
        </div>
        <div className="header-main-bottom">
          <h3>{this.headerTitle(menus, pathname)}</h3>
          <span>{this.state.time}</span>
        </div>
      </div>
    );
  }
}
export default HeaderMain;
