import React,{Component} from 'react'
import {Button,Card,Icon,Form, Input,Select, message} from 'antd'
import {connect} from 'react-redux'
import {reqCategoryList,reqPorductAdd,reqPorductId,reqPorductUpdate} from '../../api/index'
import PicturesWall from './picturesWall.jsx'
import RichTextEditor from './rich_text_editor.jsx'
 
const {Item} = Form
const { Option } = Select;

@connect(
  state => ({
    categoryList:state.categoryList,
    productList:state.productList
  }),
  {}
)
@Form.create()
class AddUpdate extends Component {
  state = {
    operaType:'add',
    categoryList:[],
    categoryId:'',
    name:'',
    desc:'',
    price:'',
    detail:'',
    imgs:[],
    _id:''
  } 
  componentDidMount() {
    const {categoryList,productList} = this.props
    if(this.props.match.params.id) {
      const {id} = this.props.match.params
      if(id){
        this.setState({operaType:'update'})
        if(productList.length) {
          let result = productList.find((item)=>{
            return item._id === id
          })
          if(result) {
            this.setState({...result})
            this.refs.picturesWall.setFileList(result.imgs)  
            this.refs.richTextEditor.setRichText(result.detail)
          }
        }else this.cateGoryId(id)
      }
    }
    if(categoryList.length) this.setState({categoryList})
    else this.getCategoryList()
  }
  //请求商品详情
  cateGoryId = async(id) => {
    let result = await reqPorductId(id)
    const {status,data} = result
    if(status===0){
      //const {categoryId,desc,detail,_id,price,name,imgs} = data
      console.log(data);
      this.setState({...data})
      this.refs.picturesWall.setFileList(data.imgs)  
      this.refs.richTextEditor.setRichText(data.detail)
    }
    else message.error('获取商品失败')
  }
  //请求商品分类列表
  getCategoryList = async() => {
    let result = await reqCategoryList()
    const {status,data,msg} = result
    if(status===0) this.setState({categoryList:data})
    else message.error(msg)
  }
  //发送添加商品请求
  /* getPorductAdd = async(porductAddObj) => {
    console.log(porductAddObj);
    let result = await reqPorductAdd(porductAddObj)
      const {status,data,msg} = result
      if(status===0) {
        message.success('新增商品成功')
        console.log(this.props);
        //this.props.history.replace('/admin/prod_about/product')
      }
        else message(msg)
  } */
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFields(async(errors,values)=>{
      if(errors) return 
        let imgs = this.refs.picturesWall.getImgsList()
        let detail = this.refs.richTextEditor.getRichText()
        if(this.state.operaType==='add'){ 
          let result = await reqPorductAdd({...values,imgs,detail})
        const {status,msg} = result
      if(status===0) {
        message.success('新增商品成功')
        //this.props.history.goBack()
        this.props.history.replace('/admin/prod_about/product')
      }
        else message.error(msg)} 
        else{
        let result = await reqPorductUpdate(this.state)
        const {status} = result
        if(status===0) {
          message.success('更新状态成功')
          this.props.history.replace('/admin/prod_about/product')}
        else message.error('更新状态失败')
        }
        
    })
  }
  handleChange = () => {}
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
        <Card 
          title={
            <div>
              <Button 
              type="link"
              onClick={()=>{this.props.history.goBack()}}>
                <Icon type="arrow-left" style={{fontSize:20}} />
              </Button>
              <span>{this.props.match.params.id?'商品详细':'商品添加'}</span>
            </div>} >
          <Form 
            onSubmit={this.handleSubmit}
            labelCol={{md: 2}}
            wrapperCol={{md: 10}}>
            <Item label="商品名称">
              {getFieldDecorator('name', {
                initialValue:this.state.name||'',
                rules: [{ required: true, message: '请输入商品名称!' }],
              })(
              <Input
              placeholder="商品名称" />)}
            </Item>
            <Item label="商品描述"
              >
              {getFieldDecorator('desc', {
                 initialValue:this.state.desc||'',
                rules: [{ required: true, message: '请输入商品描述!' }],
              })(<Input placeholder="商品描述"/>)}
            </Item>
            <Item label="商品价格">
              {getFieldDecorator('price', {
                initialValue:this.state.price||'',
                rules: [{ required: true, message: '请输入商品价格!' }],
              })(<Input prefix='￥' addonAfter='元' type='Number'  placeholder='商品价格'/>)}
            </Item>
            <Item label="商品分类">
            {getFieldDecorator('categoryList', {
                initialValue:this.state.categoryId||'',
                rules: [{ required: true, message: '请输入商品价格!' }],
              })(<Select placeholder='请选择商品分类' >
              {this.state.categoryList.map((item)=>{
                return <Option key={item._id} value={item._id}>{item.name}</Option>
              })}
            </Select>)}   
            </Item>
            <Item label="商品图片" >
              <PicturesWall ref='picturesWall' /> 
            </Item>
            <Item label="商品详情"  wrapperCol={{md: 14}}>
            <RichTextEditor ref='richTextEditor'/>
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" style={{marginLeft:"70px"}}>
                提交  
              </Button>
            </Item>
          </Form>
        </Card>
      
    )
  }
}
export default AddUpdate