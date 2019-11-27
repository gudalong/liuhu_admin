import React, { Component } from 'react'
import {Form,Input} from 'antd'

@Form.create()
class AddCategoryForm extends Component {
  render() {
    const {getFieldDecorator} =this.props.form
    return (
      <Form>
        <Form.Item label='请输入修改：'>
          {
            getFieldDecorator(
              'categoryName', {
                rules: [{ required: true, message: '不能为空' }]
              }
            )(
               <Input placeholder='请输入分类名称'></Input>
            )
          }
         
        </Form.Item>
      </Form>
    )
  }
}
export default AddCategoryForm