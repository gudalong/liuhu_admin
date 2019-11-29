import React, { Component } from "react";
import "./index.less";
import { Card, Select, Button, Icon, Table, Input } from "antd";
import {getProducts} from '../../api'


class Product extends Component {

  state={
    dataSource:[],  //定义table展示数据的的内容
    total:0     //定义当前的数据总数
  }

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

 //发送获取数据的方法
  getProducts = async(pageNum,pageSize)=>{
    const result = await getProducts(pageNum,pageSize)
    this.setState({
      dataSource:result.list,
      total:result.total
    })
  }
  componentDidMount=()=>{
    //首先调用一次获取数据
    this.getProducts(1,3)
  }
 
  //点击添加商品事件函数
  showAddProductModal =()=>{
    this.props.history.push('/product/add')
  }
  


 
  render() {
    const {dataSource,total} = this.state
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
          <Button type="primary" onClick={this.showAddProductModal}>
            <Icon type="plus" />
            添加商品
          </Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={dataSource}
          bordered
          rowKey="_id"
          pagination={{
            size: "small",
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["3", "6", "9", "12"],
            defaultPageSize: 6,
            total:total,
            onChange:this.getProducts,
            onShowSizeChange:this.getProducts,
          }}
        />
      </Card>
    );
  }
}
export default Product