import React, { Component } from "react";
import logo from "../../assets/img/logo.png";
import { Form, Input, Button, Icon } from "antd";
import "./index.less";
import { connect } from "react-redux";
import {setItem} from '../../utils/storage'
import { getUserAsync } from "../../redux/action-creators/user";
import checkLogin from '../with-check-login/index'

const { Item } = Form;

@checkLogin
@connect(null, { getUserAsync })
@Form.create()
class Login extends Component {
  //提交
  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields, resetFields },
      history
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        this.props
          .getUserAsync(username, password)
          .then(response => {
            history.push("/");
            setItem('user',response)
          })
          .catch(err => {
            //重置
            resetFields(["password"]);
          });
      }
    });
  };
  //表单校验
  validator = (rule, value, callback) => {
    const name = rule.field === "username" ? "用户名" : "密码";
    if (!value) {
      callback(name + "不能为空！");
    } else if (value.length > 13) {
      callback(name + "长度不能超过13个字符！");
    } else if (value.length < 4) {
      callback(name + "长度不能少于4个字符！");
    } else if (!/\w/.test(value)) {
      callback(name + "只能包含英文、数字和下划线");
    } else {
      //callback必须调用
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="liuhu" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-section">
          <h3>用户登录</h3>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator("username", {
                rules: [
                  // { whitespace: true, message: "不能输入空格" },
                  // { required: true, message: "请输入你的用户名!" },
                  // { min: 4, message: "用户名长度不能小于4个字符" },
                  // { max: 13, message: "用户名长度不能超过13个字符" },
                  // { pattern: /\w/, message: "用户名只能包含英文、数字和下划线"},
                  {
                    /** 这种表单校验方式相较于上种，可以复用 */
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,0.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}

export default Login;
