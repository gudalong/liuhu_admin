import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

@Form.create()
class UpdateCategoryForm extends Component {
  static propTypes = {
    categoryName: PropTypes.object.isRequired
  };
  validator = (rule, value, callback) => {
    if (this.props.categoryName.name === value) {
      callback("不能与之相同");
    } else {
      callback();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { categoryName } = this.props;
    return (
      <Form>
        <Form.Item label="请输入修改：">
          {getFieldDecorator("categoryName", {
            rules: [
              { required: true, message: "不能为空" },
              {
                validator: this.validator
              }
            ],
            initialValue: categoryName.name
          })(<Input placeholder="请输入分类名称"></Input>)}
        </Form.Item>
      </Form>
    );
  }
}
export default UpdateCategoryForm;
