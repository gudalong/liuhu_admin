import React, { Component } from "react";
import { Card, Table, Button, Icon, Modal } from "antd";
import { connect } from "react-redux";
import {
  getCategoryAsync,
  addCategoryAsync,
  updateCategoryAsync,
  deleteCategoryAsync
} from "../../redux/action-creators/category";
import AddCategoryForm from "./add-category-form";
import UpdateCategoryForm from "./update-category-form copy";

@connect(state => ({ categories: state.categories }), {
  getCategoryAsync,
  addCategoryAsync,
  updateCategoryAsync,
  deleteCategoryAsync
})
class Category extends Component {
  state = {
    addCategoryVisible: false,
    updateCategoryVisible: false,
    category: {}
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
      render: category => {
        return (
          <div>
            <Button
              type="link"
              onClick={this.showUpdateCategoryModal(category)}
            >
              修改分类
            </Button>
            <Button type="link" onClick={this.showConfirm(category)}>
              删除分类
            </Button>
          </div>
        );
      }
    }
  ];

  //隐藏函数
  hidden = name => {
    return () => {
      this.setState({
        [name + "CategoryVisible"]: false
      });
      setTimeout(() => {
        //清空表单的值
        this[name + "CategoryForm"].props.form.resetFields();
      }, 500);
    };
  };
  //添加分类
  showAddCategoryModal = () => {
    this.setState({
      addCategoryVisible: true
    });
  };
  addCategoryOk = () => {
    // console.log(e);
    //根据antd提示用wrappedComponentRef获取子组件form的值
    this.addCategoryForm.props.form.validateFields(async (errors, values) => {
      if (!errors) {
        //获取form输入的值
        const { categoryName } = values;
        //发送请求
        await this.props.addCategoryAsync(categoryName);
        //隐藏对话框
        this.hidden("add")();
      }
    });
  };

  //更新分类
  showUpdateCategoryModal = category => {
    return () => {
      this.setState({
        updateCategoryVisible: true,
        category
      });
    };
  };
  updateCategoryOk = () => {
    this.updateCategoryForm.props.form.validateFields(async (err, values) => {
      if (!err) {
        // 获取form输入的值
        const { categoryName } = values;
        const categoryId = this.state.category._id;
        //发送请求
        await this.props.updateCategoryAsync(categoryId, categoryName);
        //隐藏对话框
        this.hidden("update")();
      }
    });
  };

  //删除分类
  showConfirm = category => {
    return () => {
      this.setState({
        category
      });
      Modal.confirm({
        title: `确定要删除  分类(${category.name})  吗?`,
        content: "注意：删除后无法进行还原",
        onOk: async () => {
          const categoryId = this.state.category._id;
          await this.props.deleteCategoryAsync(categoryId);
        },
        onCancel() {},
        okText: "确认",
        cancelText: "再想想~"
      });
    };
  };
  render() {
    return (
      <div>
        <Card
          title="分类列表"
          extra={
            <Button type="primary" onClick={this.showAddCategoryModal}>
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
              defaultPageSize: 9
            }}
          />
        </Card>

        <Modal
          width="300px"
          title="添加分类"
          visible={this.state.addCategoryVisible}
          onOk={this.addCategoryOk}
          okText="确认"
          onCancel={this.hidden("add")}
          cancelText="取消"
        >
          <AddCategoryForm
            wrappedComponentRef={form => (this.addCategoryForm = form)}
          />
        </Modal>

        <Modal
          width="300px"
          title="修改分类"
          visible={this.state.updateCategoryVisible}
          onOk={this.updateCategoryOk}
          okText="确认"
          onCancel={this.hidden("update")}
          cancelText="取消"
        >
          <UpdateCategoryForm
            categoryName={this.state.category}
            wrappedComponentRef={form => (this.updateCategoryForm = form)}
          />
        </Modal>
      </div>
    );
  }
}
export default Category;
