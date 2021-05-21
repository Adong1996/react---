import React, { Component } from 'react'

import { Select,Input,Card,Button,Icon,Table,message} from 'antd';
import {reqProductList} from '../../api/index'
import {PAGE_SIZE} from '../../config/index'

const { Option } = Select;

export default class Product extends Component {
  state = {
    productList: [],
    current:1,
    total:'',

  }

  productList = async(number=1) => {
    
  let result = await reqProductList(number,PAGE_SIZE)
  const {status,data,msg} = result
  if (status===0) this.setState(
    {
      productList:data.list,
      total:data.total
    })
  else  message.error(msg)
  console.log(result);
  }
  componentDidMount(){
    this.productList()
  }
  render() {
    const dataSource = this.state.productList
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%'
        
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render:(price)=>{return '￥'+price;},
        width: '10%',
        align: 'center'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '10%',
        align: 'center',
        render:(status)=>{
          return(
            <div>
              <Button type="primary">下架</Button><br/>
              <span>{status===1?'在售':'已下架'}</span>
            </div>
          )
        },
        
      },
      {
        title: '操作',
        dataIndex: 'opera',
        key: 'opera',
        width: '10%',
        align: 'center',
        render:()=>{
          return(
            <div>
              <Button type="link">详细</Button><br/>
              <Button type="link">修改</Button>
            </div>
          )
        },
      }
    ];
    return (
      <div>
        <Card title={
        <div>  
          <Select defaultValue="name" style={{ width: 120 }} >
            <Option value="name">按名称搜索</Option>
            <Option value="desc">按描述搜索</Option>
          </Select>
          <Input placeholder="请搜索关键字"style={{ width: '20%', margin: '0px 10px' }} />
          <Button type="primary"style={{ margin: 5 }}><Icon type="search" />搜索</Button>
        </div>
          }
           
          extra={<Button type="primary" ><Icon type="plus-circle" />添加商品</Button>} >
          <Table 
          dataSource={dataSource} 
          columns={columns} 
          bordered
          rowKey={'_id'}
          pagination={
            {defaultCurrent:this.state.current,
            total:this.state.total,
            pageSize:PAGE_SIZE,
            onChange:this.productList
            }} />
        </Card>
      </div>
    )
  }
}
