import React, { Component } from "react";
import "./index.less";
import { Card, Select, Button, Icon, Table, Input } from "antd";



export default class Product extends Component {

 


  columns = [
    {
      title: "商品名称",
      dataIndex: "name"
      // render: text => <a>{text}</a>,
    },
    {
      title: "商品描述",
      dataIndex: "desc"
    },
    {
      title: "价格",
      dataIndex: "price"
    },
    {
      title: "状态",
      dataIndex: "status",
      render: category => {
        return (
          <div>
            <Button type="primary">上架</Button>
            已下架
          </div>
        );
      }

    },
    {
      title: "操作",
      render: category => {
        return (
          <div>
            <Button type="link">详情</Button>
            <Button type="link">修改</Button>
          </div>
        );
      }
    }
  ];

  render() {

    return (
      <Card
        title={
          <div>
            <Select defaultValue={1}>
              <Select.Option value={1}>根据商品名称</Select.Option>
              <Select.Option value={2}>根据商品描述</Select.Option>
            </Select>
            <Input placeholder="关键字" className="title-input"></Input>
            <Button type="primary">搜索</Button>
          </div>
        }
        extra={
          <Button type="primary" onClick={this.showAddCategoryModal}>
            <Icon type="plus" />
            添加商品
          </Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={[]}
          bordered
          rowKey="_id"
          pagination={{
            size: "small",
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["3", "6", "9", "12"],
            defaultPageSize: 6
          }}
        />
      </Card>
    );
  }
}
