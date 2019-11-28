import React, { Component } from "react";
import { Card, Form, Icon, Input, Select, InputNumber, Button } from "antd";
import Editor from './editor'
import {connect} from 'react-redux'
import { getCategoryAsync} from '../../../redux/action-creators/category'


@connect(
  (state)=>({categories:state.categories}),
  {getCategoryAsync}
)
class AddProductForm extends Component {

componentDidMount=()=>{
  if(!this.props.categories.length){
    this.props.getCategoryAsync()
  }
}


  render() {
    const { Item } = Form;
    const { Option } = Select;
    const { categories } = this.props;
    return (
      <Card
        title={
          <div>
            <Icon type="arrow-left" />
            &nbsp;&nbsp;添加商品
          </div>
        }
      >
        <Form  labelCol={{ span: 2 }} wrapperCol={{ span: 8 }}>
          <Item label="商品名称">
            <Input placeholder="请输入商品名称" />
          </Item>

          <Item label="商品描述">
            <Input placeholder="请输入商品描述" />
          </Item>

          <Item label="商品分类">
            <Select placeholder="请选择商品分类">
            {
              categories.map((category)=>{
                return <Option value={category._id}>
                  {category.name}
                </Option>
              })
            }
            </Select>
          </Item>

          <Item label="商品价格">
            <InputNumber
              style={{ width: 150 }}
              formatter={value =>
                `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={value => value.replace(/\$\s?|(,*)/g, "")}
              // onChange={onChange}
            />
            </Item>
            <Item label="商品详情" wrapperCol={{ span: 22 }} >
              <Editor />
            </Item>
            <Item>
              <Button type="primary">提交</Button>
            </Item>
          
        </Form>
      </Card>
    );
  }
}
export default AddProductForm