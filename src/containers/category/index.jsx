import React, { Component } from "react";
import { Card, Table, Button, Icon, Modal } from "antd";
import { connect } from "react-redux";
import {
  getCategoryAsync,
  addCategoryAsync
} from "../../redux/action-creators/category";
import AddCategoryForm from "./add-category-form";

@connect(state => ({ categories: state.categories }), {
  getCategoryAsync,
  addCategoryAsync
})
class Category extends Component {
  state = {
    visible: false
  };
  componentDidMount = () => {
    this.props.getCategoryAsync();
  };

  columns = [
    {
      title: "品类名称",
      dataIndex: "name"
      // render: text => <a>{text}</a>,
    },
    {
      title: "操作",
      className: "column-money",
      render: () => {
        return (
          <div>
            <Button type="link">修改分类</Button>
            <Button type="link">删除分类</Button>
          </div>
        );
      }
    }
  ];
  hidden = () => {
    this.setState({
      visible: false
    });
    setTimeout(() => {
      //清空表单的值
      this.categoryForm.props.form.resetFields();
    }, 500);
  };
  showCategoryModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = () => {
    // console.log(e);
    //根据antd提示用wrappedComponentRef获取子组件form的值
    this.categoryForm.props.form.validateFields(async (errors, values) => {
      if (!errors) {
        //获取form输入的值
        const { categoryName } = values;
        //发送请求
        await this.props.addCategoryAsync(categoryName);
        //隐藏对话框
        this.hidden();
      }
    });
  };

  render() {
    return (
      <div>
        <Card
          title="分类列表"
          extra={
            <Button type="primary" onClick={this.showCategoryModal}>
              <Icon type="plus" />
              分类列表
            </Button>
          }
        >
          <Table
            columns={this.columns}
            dataSource={this.props.categories}
            bordered
            rowKey="_id"
            pagination={{
              size: "small",
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ["3", "6", "9", "12"],
              defaultPageSize: 3
            }}
          />
        </Card>

        <Modal
          width="300px"
          title="添加分类"
          visible={this.state.visible}
          onOk={this.handleOk}
          okText="确认"
          onCancel={this.hidden}
          cancelText="取消"
        >
          <AddCategoryForm
            wrappedComponentRef={form => (this.categoryForm = form)}
          />
        </Modal>
      </div>
    );
  }
}
export default Category;
