import React, { Component } from "react";
import { Button, Icon } from "antd";
import  screenfull  from "screenfull";
import "./index.less";

export default class HeaderMain extends Component {
  state={
    isScreenFull:false
  }


  toggleScreen = () => {
    //切换全屏
    screenfull.toggle()
  };


  //单独定义一个函数，用来被绑定和解绑
  screenFn=()=>{
    this.setState({
      isScreenFull:!this.state.isScreenFull
    })
  }

  componentDidMount=()=>{
    screenfull.on('change',this.screenFn)
  }

  componentWillUnmount=()=>{
    //万一元素不存在的时候就要解绑函数
    screenfull.off('change',this.screenFn)
  }


  render() {

    return (
      <div className="header-main">
        <div className="header-main-top">
          <Button size="small" onClick={this.toggleScreen}> 
            <Icon type={this.state.isScreenFull ? "fullscreen-exit" :"fullscreen"} />
          </Button>
          <Button size="small" className="lang-btn">
            Enligth
          </Button>
          <span>欢迎，liuhu</span>
          <Button type="link">退 出</Button>
        </div>
        <div className="header-main-bottom">
          <h3>首页</h3>
          <span>20191124 15:25</span>
        </div>
      </div>
    );
  }
}
