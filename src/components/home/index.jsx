import React, { Component } from "react";
import "./index.less";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="home-title">
          <h2>欢迎使用<span role='img' aria-label='爱心'>❤</span></h2>
          <h2>尚硅谷<span role='img' aria-label='笑脸'>😍</span>管理后台~~</h2>
        </div>
      </div>
    );
  }
}
export default Home;
