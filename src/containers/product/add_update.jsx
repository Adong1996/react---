import React,{Component} from 'react'
import {Button,Card,Icon,Form, Input} from 'antd'

const {Item} = Form
@Form.create()
class AddUpdate extends Component {
  state = {
    categoryId:''
  } 
  componentDidMount() {
    if(this.props.match.params.id) {
      const categoryId = this.props.match.params.id
      this.setState({categoryId})
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Card title={
          <div>
            <Button 
            type="link"
            onClick={()=>{this.props.history.goBack()}}>
              <Icon type="arrow-left" style={{fontSize:20}} />
            </Button>
            <span>{this.props.match.params.id?'商品详细':'商品添加'}</span>
          </div>} >
          <Form layout="inline">
            <Item label="商品名称">
              {getFieldDecorator('商品名称', {
                rules: [{ required: true, message: 'Username is 商品名称!' }],
              })(<Input />)}
            </Item>
            <Item label="商品名称">
              {getFieldDecorator('商品名称', {
                rules: [{ required: true, message: 'Username is 商品名称!' }],
              })(<Input />)}
            </Item>
            <Item label="商品名称">
              {getFieldDecorator('商品名称', {
                rules: [{ required: true, message: 'Username is 商品名称!' }],
              })(<Input />)}
            </Item>
            <Item label="商品名称">
              {getFieldDecorator('商品名称', {
                rules: [{ required: true, message: 'Username is 商品名称!' }],
              })(<Input />)}
            </Item>
            <Item label="商品图片">
              
            </Item>
            <Item label="商品详情">
              
            </Item>
          </Form>
        </Card>
        AddUpdate{this.props.match.params.id}
      </div>
    )
  }
}
export default AddUpdate