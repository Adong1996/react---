import React,{Component} from 'react'
import { Card,Button,Icon,Table,message,Modal,Input,Form } from 'antd';

import {reqCategoryList,reqAddCategory,reqUndateCategory} from '../../api/index.js'
import {PAGE_SIZE} from '../../config/index'

const {Item} = Form

@Form.create()
class Category extends Component {
 
  state = {
    category: [],
    visible: false,
    opertype: '',
    isLoading:true,
    modalCurrentValue:'',
    modalCurrentId:''
  }
  //商品分类请求
  componentDidMount() {
    this.getCategoryList()
  }
  //请求商品分类
  getCategoryList = async() => {
    let result = await reqCategoryList()
    this.setState({isLoading:false})
    const {status,data,msg} = result
    if (status === 0) this.setState({category:data.reverse()})
    else message.error(msg)
  }
  //点击添加弹窗回调
  showAdd = () => {
    this.setState({
      visible: true,
      opertype:'add',
      modalCurrentValue:'',
      modalCurrentId:''
    });
  };
  //点击更新弹窗回调
  showUpdate = (item) => {
    const {_id,name} = item
    console.log(item);
    this.setState({
      modalCurrentValue:name,
      modalCurrentId:_id,
      visible: true,
      opertype:'update'
    });
  };

  //点击添加确实事件回调
  toAdd = async(values) => {
    let result = await reqAddCategory(values)
    
    const {status, data, msg} = result
    if(status===0) {
      let category = [...this.state.category]
      category.unshift(data)
      this.setState({category})
      message.success("添加分类成功!")
      this.props.form.resetFields()
      this.setState({
        visible: false,
      });}
    if(status===1) message.warning(msg)
  }

  //点击修改确认事件
  toUpdate = async(categoryObj) => {
    let result = await reqUndateCategory(categoryObj)
    console.log(result);
    let {status,msg} = result
    if (status===0) {
      this.getCategoryList()
      message.success('更新分类成功')
      this.props.form.resetFields()
      this.setState({
        visible: false,
      });
    }else message.error(msg)


  }
//点击OK回调
  handleOk = () => {
    console.log(this.props.form);
    const {opertype} = this.state
    this.props.form.validateFields(async(err,values)=>{
      if (err) {
        message.warning('表单输入有误，请从新输入')
        return
      }
      if(opertype==='add') this.toAdd(values)
      if(opertype==='update') {
        console.log(values);
        const {categoryName} = values
        const categoryId = this.state.modalCurrentId
        const categoryObj ={categoryId,categoryName}
        this.toUpdate(categoryObj)}
        
      
    })
  };
//点击取消回调
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  
  render() {
    const dataSource = this.state.category
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '分类',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        render:(item)=>{return <Button type="link" onClick={()=>{this.showUpdate(item)}}>修改分类</Button>},
        align: 'center',
        width: '25%'
      },
    ];
    return(
      <div>
         <Modal
          title={this.state.opertype === 'add' ? '新增分类' : '更新分类'}
          visible={this.state.visible}
          okText='确认'
          cancelText='取消'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator('categoryName', {
              initialValue:this.state.modalCurrentValue,//input默认输出
              rules: [{ required: true, message: '分类名必须输入!' }]})
              (<Input placeholder="请输入分类名"/>)}
              </Item>
          </Form>  
        </Modal>
        <Card title="" extra={
        <Button type="primary" onClick={this.showAdd}><Icon type="plus-circle" />添加</Button>} >

        <Table dataSource={dataSource}
         columns={columns}
         bordered rowKey='_id' 
         pagination={{pageSize: PAGE_SIZE,showQuickJumper:true } }
         loading={this.state.isLoading}/>
        </Card>
      </div>
    )
  }
}
export default Category