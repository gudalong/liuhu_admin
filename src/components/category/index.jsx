import React, { Component } from "react";
import { Card, Table, Button, Icon } from "antd";

export default class Category extends Component {


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

   data = [
    {
      _id: "5c2ed631f352726338607046",
      name: "分类001"
    },
    {
      _id: "5c2ed647f352726338607047",
      name: "分类002"
    },
    {
      _id: "5c2ed64cf352726338607048",
      name: "分类003"
    },
    {
      _id: "5c2ed64cf352726338607049",
      name: "分类004"
    },
    {
      _id: "5c2ed64cf352726338607050",
      name: "分类005"
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
          dataSource={this.data}
          bordered
          rowKey="_id"
          pagination={{
            size:'small',
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
