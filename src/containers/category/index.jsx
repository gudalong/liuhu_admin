import React, { Component } from "react";
import { Card, Table, Button, Icon } from "antd";
import { connect } from "react-redux";
import { getCategoryAsync } from "../../redux/action-creators/category";

@connect(state => ({ categories: state.categories }), { getCategoryAsync })
class Category extends Component {
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

  render() {
    return (
      <Card
        title="分类列表"
        extra={
          <Button type="primary">
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
    );
  }
}
export default Category;
