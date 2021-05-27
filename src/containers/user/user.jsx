import React,{Component} from 'react'
import {Card,Button,Icon,Table, message,Modal,Form,Input,Select} from 'antd';
import dayjs from 'dayjs'
import {reqUserList,reqAddUser,reqUserUpdate,reqUserDelete} from '../../api'
import {PAGE_SIZE} from '../../config'
const {Item} = Form
const {Option} = Select

@Form.create()
class User extends Component{

  state = {
    isShowAdd:false, //是否展示新增弹窗
    userList:[],//用户列表
    roleList:[],//角色列表
    opType:'',
    _id:'',
    username:'',
    password:'',
    email:'',
    phone:'',
    create_time:'',
    roleName:'',
    role_id:''

  }

  getUserList = async()=>{
    let result = await reqUserList()
    const {status,data} = result
    if(status === 0) this.setState({
      userList:data.users.reverse(),
      roleList:data.roles
    })
  }

  componentDidMount(){
    this.getUserList()
  }

  //新增用户弹窗----确定按钮回调
  handleOk = async()=>{
    this.props.form.validateFields(async(err, values) => {
      if(err) return
      if(this.state.opType==='add'){
        let result = await reqAddUser(values)
      const {status,data,msg} = result
      if(status===0){
        message.success('添加用户成功')
        let userList = [...this.state.userList]
        userList.unshift(data)
        this.setState({userList,isShowAdd:false})
      }
      else message.error(msg,1)
      }
      if(this.state.opType==='update'){
        let result = await reqUserUpdate({...values,_id:this.state._id})
        const {status,data} = result
        if(status===0) {
          console.log(data);
          const {roleList} = this.state
          let roleName = roleList.find((item)=>item._id === data.role_id)
          console.log(roleName);
          if(roleName)this.setState({roleName:roleName.name})
          message.success('修改用户成功')
          this.setState({
            isShowAdd:false,
            _id:data._id,
            username:data.username,
            password:data.password,
            email:data.email,
            phone:data.phone,
            create_time:data.create_time,
          })
          this.getUserList()
        }
        else message.error('更新用户失败')
      }
    })
  }
      

  //新增用户弹窗----取消按钮回调
  handleCancel = ()=>{
    this.setState({isShowAdd:false})
  }
  //修改用户弹窗
  userAuth = (item)=>{
    const {_id,username,password,email,phone,create_time,role_id} = item
    this.setState({_id,username,password,email,phone,create_time,isShowAdd:true,opType:'update'})
    const {roleList} = this.state
    let roleName = roleList.find((item)=>item._id === role_id)
    if(roleName)this.setState({roleName:roleName.name,_id})
  }
    //用户删除
  showDel = async(user) => {
    if(window.confirm(`你确认删除${user.username}`)){
      let result = await reqUserDelete(user._id)
      const {status} = result
      if(status===0) {
        message.success('删除成功')
        this.getUserList()}
    }
  }
  render(){
    const dataSource = this.state.userList
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render: time => dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss')
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        key: 'role_id',
        render:(id)=>{
          let result = this.state.roleList.find((item)=>{
            return item._id === id
          })
          if(result) return result.name
        }
      },
      {
        title: '操作',
        key: 'option',
        render: (item) => (
          <div>
            <Button 
              type='link' onClick={()=>{this.userAuth(item)}}
             >修改
            </Button>
            <Button 
              type='link' onClick={()=>{this.showDel(item)}}
             >删除
            </Button>
          </div>
          )
      }
    ];
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        <Card
          title={
            <Button type='primary' 
            onClick={()=>{
              this.setState({
              isShowAdd:true,
              opType:'add',
              _id:'',
              username:'',
              email:'',
              phone:'',
              create_time:'',
              roleName:''});
              this.props.form.resetFields()}}>
              <Icon type="plus"/>创建用户
            </Button>
          }
        >
          <Table 
            dataSource={dataSource} 
            columns={columns}
            bordered
            pagination={{defaultPageSize:PAGE_SIZE}}
            rowKey="_id"
          />
        </Card>
        {/* 新增角色提示框 */}
        <Modal
          title={this.state.opType==='add'?'添加用户':'修改用户'}
          visible={this.state.isShowAdd}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form labelCol={{span:4}} wrapperCol={{span:16}}>
            <Item label="用户名">
              {getFieldDecorator('username', {
                initialValue:this.state.username||'',
                rules: [{required: true, message: '用户名必须输入' },],
              })(<Input placeholder="请输入用户名"/>)}
            </Item>
            <Item label="密码">
              {getFieldDecorator('password', {
                initialValue:this.state.password||'',
                rules: [{required: true, message: '密码必须输入' },],
              })(<Input placeholder="请输入密码"/>)}
            </Item>
            <Item label="手机号">
              {getFieldDecorator('phone', {
                initialValue:this.state.phone||'',
                rules: [{required: true, message: '手机号必须输入' },],
              })(<Input placeholder="请输入手机号"/>)}
            </Item>
            <Item label="邮箱">
              {getFieldDecorator('email', {
                initialValue:this.state.email||'',
                rules: [{required: true, message: '邮箱必须输入' },],
              })(<Input placeholder="请输入邮箱"/>)}
            </Item>
            <Item label="角色">
              {getFieldDecorator('role_id', {
                initialValue:this.state.roleName||'',
                rules: [{required: true, message: '必须选择一个角色' },],
              })(
                <Select>
                  <Option value=''>请选择一个角色</Option>
                  {
                    this.state.roleList.map((item)=>{
                      return <Option key={item._id} value={item._id}>{item.name}</Option>
                    })
                  }
                </Select>
              )}
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default User