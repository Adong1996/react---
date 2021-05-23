import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Select,Input,Card,Button,Icon,Table,message} from 'antd';
import {reqProductList,reqUpdateStatus,reqSearchProduct} from '../../api/index'
import {PAGE_SIZE} from '../../config/index'
import {createsaveProductListAction} from '../../redux/action_creators/product_action.js'

const { Option } = Select;

@connect(
  state=>({}),
  {saveProductList:createsaveProductListAction}
)
class Product extends Component {
  state = {
    productList: [],
    current:1,
    total:'',
    keyWord:'',
    searchType:'productName',
    isLocal:true
  }
  componentDidMount(){
    this.productList()
  }

//更新商品状态
updateStatus = async({_id,status}) => {
  let productList = [...this.state.productList]
  if (status===1) status = 2
    else status = 1
 let result = await reqUpdateStatus(_id,status)
  if (result.status===0) {
     productList = productList.map((item)=>{
      if(item._id===_id) {
        item.status=status
        return item
      } else return item
    })
    this.setState({productList})
    message.success('更新商品状态成功')
  }
  else message.error('更新商品状态失败')
}
//请求商品列表
  productList = async(number=1) => {
    const {searchType,keyWord} = this.state
    let result
    if (this.isSeach)  result = await reqSearchProduct(number,PAGE_SIZE,searchType,keyWord)
    else  result = await reqProductList(number,PAGE_SIZE)
    const {status,data} = result
    if (status===0) {this.setState(
      {
        productList:data.list,
        total:data.total,
        current:data.pageNum,
        isLocal:false
      })
    this.props.saveProductList(data.list)}
    else  message.error('获取商品失败')
    }
    search = async() => {
      this.isSeach = true
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
        //dataIndex: 'status',（能拿到整个状态）
        key: 'status',
        width: '10%',
        align: 'center',
        render:(item)=>{
          return(
            <div>
              <Button type={item.status===1? "danger": "primary"} 
              onClick={()=>{this.updateStatus(item)}}>
              {item.status===1?'下架':'上架'}
              </Button><br/>
              <span>{item.status===1?'在售':'已销售'}</span>
            </div>
          )
        },
        
      },
      {
        title: '操作',
        //dataIndex: 'opera',
        key: 'opera',
        width: '10%',
        align: 'center',
        render:(item)=>{
          return(
            <div>
              <Button type="link"onClick={()=>{this.props.history.push(`/admin/prod_about/product/detail/${item._id}`)}} >详细</Button><br/>
              <Button type="link"onClick={()=>{this.props.history.push(`/admin/prod_about/product/add_update/${item._id}`)}} >修改</Button>
            </div>
          )
        },
      }
    ];
    return (
      <div>
        <Card title={
        <div>  
          <Select defaultValue="productName" style={{ width: 120 }}
           onChange={(value)=>{this.setState({searchType:value})}} >
            <Option value="productName">按名称搜索</Option>
            <Option value="productDesc">按描述搜索</Option>
          </Select>
          <Input placeholder="请搜索关键字"
          style={{ width: '20%', margin: '0px 10px' }} 
          allowClear
          onChange={(event)=>{this.setState({keyWord:event.target.value})}} />
          <Button type="primary"
          style={{ margin: 5 }}
          onClick={this.search}><Icon type="search" />搜索</Button>
        </div>
          }
           
          extra={<Button type="primary" onClick={()=>{this.props.history.push('/admin/prod_about/product/add_update')}} ><Icon type="plus-circle" />添加商品</Button>} >
          <Table 
          dataSource={dataSource} 
          columns={columns} 
          bordered
          rowKey={'_id'}
          loading={this.state.isLocal}
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
export default Product
