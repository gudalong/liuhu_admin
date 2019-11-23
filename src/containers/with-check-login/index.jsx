import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

/**
 * 检查登录，需要复用 --> 定义高阶组件， 需要用到redux中的数据
 */

const withCheckLogin = WrappedComponent => {
  return connect(
    state => ({ token: state.user.token }),
    null
  )(
    class extends Component {
      static displayName = `checkLogin(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`
      render() {
        const { location, token,...rest } = this.props;
        if (location.pathname === "/login") {
          if (token) {
            return <Redirect to="/" />;
          }
        } else {
          if (!token) {
            return <Redirect to="/login" />;
          }
        }

        return <WrappedComponent {...rest} location={location} />;
      }
    }
  );
};

export default withCheckLogin;
