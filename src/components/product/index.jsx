import React, { Component } from "react";
import "./index.less";
import { Card, Select, Button, Icon, Table, Input, Modal ,message} from "antd";
import { getProducts ,deleteProduct} from "../../api";

class Product extends Component {
  state = {
    dataSource: [], //定义table展示数据的的内容
    total: 0, //定义当前的数据总数
    product: {},
    pageNum:1,
    pageSize:3     //只能选择"3", "5", "6","8","9",'12'
  };
  //删除商品
  deleteProductFirm = product => {
    return () => {
    this.setState({
        product
      });
      // console.log(product);

      Modal.confirm({
        title: `确定要删除  商品(${product.name})  吗?`,
        content: "望小主三思而后行~~",
        onOk: async () => {
          const productId = this.state.product._id;
          //发送删除请求
          await deleteProduct(productId);
          message.success('删除成功')
          //从新获取请求
          this.getProducts(this.state.pageNum, this.state.pageSize);
        },
        onCancel() {},
        okText: "确认",
        cancelText: "再想想"
      });
    };
  };

  //修改商品信息
  updateProductForm =(product)=>{
    return ()=>{
      this.props.history.push("/product/update",product);
    }
  }
  //table表头信息
  columns = [
    {
      title: "商品名称",
      dataIndex: "name"
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
      render: product => {
        return (
          <div>
            <Button type="link">详情</Button>
            <Button type="link" onClick={this.updateProductForm(product)}>修改</Button>
            <Button type="link" onClick={this.deleteProductFirm(product)}>删除</Button>
          </div>
        );
      }
    }
  ];

  //发送获取数据的方法
  getProducts = async (pageNum, pageSize) => {
    const result = await getProducts(pageNum, pageSize);
    this.setState({
      dataSource: result.list,
      total: result.total
    });
  };
  //首先调用一次获取商品数据
  componentDidMount = () => {
    //首先调用一次获取数据
    this.getProducts(this.state.pageNum, this.state.pageSize);
  };

  //点击添加商品事件函数
  showAddProductForm = () => {
    this.props.history.push("/product/add");
  };

  render() {
    const { dataSource, total } = this.state;
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
          <Button type="primary" onClick={this.showAddProductForm}>
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
            pageSizeOptions: ["3", "5", "6","8","9",'12'],
            defaultPageSize: this.state.pageSize,
            total: total,
            onChange: this.getProducts,
            onShowSizeChange: this.getProducts
          }}
        />
      </Card>
    );
  }
}
export default Product;
