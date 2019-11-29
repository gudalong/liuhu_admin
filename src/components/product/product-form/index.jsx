import React, { Component } from "react";
import {
  Card,
  Form,
  Icon,
  Input,
  Select,
  InputNumber,
  Button,
  message
} from "antd";

import { connect } from "react-redux";
import { addProduct, updateProduct } from "../../../api";
import { getCategoryAsync } from "../../../redux/action-creators/category";
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import "./index.less";

@Form.create()
@connect(state => ({ categories: state.categories }), { getCategoryAsync })
class ProductForm extends Component {
  state = {
    // 创建一个空的editorState作为初始值  富文本编辑器的状态
    editorState: BraftEditor.createEditorState(null)
  };
  //富文本编辑器函数
  handleEditorChange = editorState => {
    this.setState({
      editorState
    });
  };
  //富文本编辑器的校验函数
  validator = (rule, value, callback) => {
    if (!value || value.isEmpty()) {
      callback("请输入正文内容");
    } else {
      callback();
    }
  };
  componentDidMount = () => {
    if (!this.props.categories.length) {
      this.props.getCategoryAsync();
    }
  };
  goBack = () => {
    this.props.history.goBack();
  };

  addProduct = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        //获取表单name,desc,categoryId,price
        const { name, desc, price, categoryId, editorState } = values;
        //获取表单中富文本编辑器的文本值
        const detail = editorState.toHTML();
        
        const { state } = this.props.location;
        let content = "添加";
        if (this.props.location.state) {
          //修改数据
          await updateProduct({
            name,
            desc,
            categoryId,
            price,
            detail,
            productId: state._id
          });
          content = "修改";
        } else {
          //添加数据
          await addProduct({ name, desc, categoryId, price, detail });
        }
        //发出提示消息并跳转页面
        message.success(`${content}成功`);
        this.goBack();
      }
    });
  };

  render() {
    const { Item } = Form;
    const { Option } = Select;
    const {
      categories,
      form: { getFieldDecorator },
      location: { state }
    } = this.props;

    let isState = false;
    if (state) {
      isState = true;
    }

    return (
      <Card
        title={
          <div>
            <Icon type="arrow-left" onClick={this.goBack} />
            &nbsp;&nbsp;
            {`${isState ? "修改~" : "添加~"}商品`}
          </div>
        }
      >
        <Form
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
          onSubmit={this.addProduct}
        >
          <Item label="商品名称">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入商品名称" }],
              initialValue: isState ? state.name : ""
            })(<Input placeholder="请输入商品名称" />)}
          </Item>

          <Item label="商品描述">
            {getFieldDecorator("desc", {
              rules: [{ required: true, message: "请输入商品描述" }],
              initialValue: isState ? state.desc : ""
            })(<Input placeholder="请输入商品描述" />)}
          </Item>

          <Item label="商品分类">
            {getFieldDecorator("categoryId", {
              rules: [{ required: true, message: "请选择商品分类" }],
              //目前有Bug，未能解决
              initialValue: isState ? state.categoryId : ""
            })(
              <Select placeholder="请选择商品分类">
                {categories.map(category => {
                  return (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </Item>

          <Item label="商品价格">
            {getFieldDecorator("price", {
              rules: [{ required: true, message: "请输入商品价格" }],
              initialValue: isState ? state.price : ""
            })(
              <InputNumber
                style={{ width: 150 }}
                formatter={value =>
                  `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/￥\s?|(,*)/g, "")}
              />
            )}
          </Item>
          <Item label="商品详情" wrapperCol={{ span: 22 }}>
            {getFieldDecorator("editorState", {
              validateTrigger: "onBlur",
              rules: [
                {
                  required: true,
                  validator: this.validator
                }
              ],
              initialValue: isState
                ? BraftEditor.createEditorState(state.detail)
                : ""
            })(
              <BraftEditor
                className="rich-text-editor"
                setFieldsValue={this.state.editorState}
                onBlur={this.handleEditorChange}
                // onSave={this.submitContent}
              />
            )}
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}
export default ProductForm;
