import React,{Component} from 'react'
import {Button,Card,Icon,List,message } from 'antd'
import {connect} from 'react-redux'

import {reqPorductId, reqCategoryList} from '../../api/index.js'
import {BASE_URL} from '../../config/index'
import './detail.less'

const {Item} = List
@connect(
  state => ({
    productList:state.productList,
    categoryList:state.categoryList
  }),
  {}
)
class Detail extends Component {
  state = {
    categoryId:'',
    desc:'',
    detail:'',
    _id:'',
    price:'',
    name:'',
    imgs:[],
    categoryName:''
  }

  componentDidMount(){
    const productList = this.props.productList
    const categoryList = this.props.categoryList
    const {id}= this.props.match.params
    if(productList.length){
    let result = productList.find((item)=>{
      return item._id === id
    })
    if(result){
      this.categoryId = result.categoryId
      this.setState({...result})
    }}
    else this.cateGoryId(id)
    if(categoryList.length) {
      let result =  categoryList.find((item)=>{
      return  item._id === this.categoryId})
      if(result) {
        const {name} = result
        this.setState({categoryName:name})
      }
    }else this.categoryList()
  }
  //请求商品分类
  categoryList = async() => {
    let result = await reqCategoryList()
    const {status,data} = result
    if (status===0) {
      let result = data.find((item)=>{
        return item._id === this.state.categoryId
      })
      this.setState({categoryName:result.name})}
  }
  //请求商品详情
  cateGoryId = async(id) => {
    let result = await reqPorductId(id)
    const {status,data} = result
    if(status===0){
      //const {categoryId,desc,detail,_id,price,name,imgs} = data
      this.setState({...data})
    }
    else message.error('获取商品失败')
  }
  render(){
    return(
      <div>
        <Card title={
        <div className='left-top'>
          <Button type='link' 
            onClick={()=>{this.props.history.goBack()}} >
            <Icon type="arrow-left" style={{fontSize:20}} /></Button>
          <span>商品详细</span>
        </div>}>
          <List className='list'>
            <Item>
            <div className='item'>
              <span className='prod-name'>商品名称:</span>
              <span>{this.state.name}</span>
              </div>
            </Item>
            <Item>
              <div className='item'>
                <span className='prod-name'>商品描述:</span>
                <span>{this.state.desc}</span>
              </div>
            </Item>
            <Item>
              <div className='item'>
                <span className='prod-name'>商品价格:</span>
                <span>{this.state.price}</span>
              </div>
            </Item>
            <Item>
              <div className='item'>
                <span className='prod-name'>所属分类:</span>
                <span>{this.state.categoryName}</span>
              </div>
            </Item>
            <Item>
              <div className='item'>
                <span className='prod-name'>商品图片:</span>
                {
                  this.state.imgs.map((item)=>{
                    return <img src={`${BASE_URL}/upload/`+item} alt='商品图片' key={item} />
                  })
                }
              </div>
            </Item>
            <Item >
              <div className='item'>
              <span className='prod-name'>商品详情:</span>
              <span dangerouslySetInnerHTML={{__html:this.state.detail}}></span>
              </div>
            </Item>
          </List>
        </Card>
      </div>
    )
  }
}
export default Detail