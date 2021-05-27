import React, { Component } from 'react'
import { Button, Card, Table ,Modal,Icon,Form,Input, message,Tree} from 'antd';
import dayjs from 'dayjs'
import {connect} from 'react-redux'
import {reqRoleList,reqRoleAdd,reqRoleUpdate} from '../../api/index'
import {menuList} from '../../config/menu_config.js'
import {PAGE_SIZE} from '../../config/index'

const {Item} = Form
const { TreeNode } = Tree;
@connect(
  state => ({
    userName:state.userInfo.user.username
  }),
  {}
)
@Form.create()
class Role extends Component {
  state = { 
    isShowAdd:false,
    isShowAuth:false,
    roleList:[],
    //tree
    //expandedKeys: ['0-0-0', '0-0-1'],//配置默认打开节点
    //autoExpandParent: true,
    checkedKeys: [],//已经选择的菜单
    //selectedKeys: [],
    _id:'',//当前操作的角色ID
    menuList
   };
  componentDidMount() {
    this.getRoleList()
  }
  //请求角色list
  getRoleList = async() => {
    let result = await reqRoleList()
    const {status,data} = result
    if(status === 0) this.setState({roleList:data})
  }
  //新增角色-确认按钮
  handleOk = () => {
    this.props.form.validateFields(async(err,values) => {
      if(err) return
      else {
        let result = await reqRoleAdd(values.authName)
        const {status,msg} = result
        if(status===0) {
          message.success('新增角色成功')
          this.getRoleList()
          this.setState({
            isShowAdd: false,
          });}
        else message.error(msg)
        
      }
    })
  };
  //新增角色-取消按钮
  handleCancel = () => {
    this.setState({
      isShowAdd: false,
    });
  };
  //授权弹窗--确认按钮
  handleAuthOk = async() => {
    const {userName} = this.props
    const {_id,checkedKeys} = this.state
    console.log({_id,menus:checkedKeys,auth_name:userName});
    let result = await reqRoleUpdate({_id,menus:checkedKeys,auth_name:userName})
    const {status,msg} = result
    if(status===0){
      message.success('授权成功')
      console.log(result);
      this.setState({isShowAuth:false})
      this.getRoleList()
    }
    else message.error(msg)
  }
  //授权弹窗--取消按钮
  handleAuthCancel = () => {
    this.setState({isShowAuth:false})
  }
  //tree
  /* onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }; */

  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
  };
//用于展示授权弹窗
  showAuth = (id) => {
    const {roleList} = this.state
    let result = roleList.find((item)=>{
      return item._id === id
    })
    if(result) this.setState({checkedKeys:result.menus})
    this.setState({isShowAuth:true,_id:id})
  }

  /* onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }; */
  //用于展示添加弹窗
  showAdd = () => {
    this.props.form.resetFields()//重置表单
    this.setState({isShowAdd:true})
  }

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });
  render() {
    const {getFieldDecorator} = this.props.form
    const dataSource = this.state.roleList
    //表单数据
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render:(time)=>dayjs(time).format('YYYY-MM-DD--HH:mm:ss')
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
        render:(time)=> time?dayjs(time).format('YYYY-MM-DD--HH:mm:ss'):''
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
      },
      {
        title: '操作',
        //dataIndex: 'address',注能传递整个一项
        key: 'address',
        render:(item) => <Button type="link" onClick={()=>{this.showAuth(item._id)}}>设置权限</Button>
      },
    ];
    //tree数据
    const treeData = menuList
    return (
    <div>
      <Card 
        title={<Button type="primary" onClick={()=>{this.showAdd()}}>
                <Icon type='plus'/>
                新增角色
                </Button>}
        style={{width:'100%'}}>
        <Table 
          dataSource={dataSource} 
          columns={columns}
          bordered
          pagination={{defaultPageSize:PAGE_SIZE}}
          rowKey='_id' /> 
      </Card>
      <Modal
          title="新增角色"
          visible={this.state.isShowAdd}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='确认'
          cancelText='取消'
        >
          <Form onSubmit={this.handleOk}>
            <Item >
              {getFieldDecorator('authName', {
                initialValue:'',
                rules: [{ required: true, message: '角色必须输入!' }],
              })(
                <Input
                  placeholder="请输入角色名"
                />,
              )}
            </Item>
          </Form>
        </Modal>
        <Modal
          title="新增权限"
          visible={this.state.isShowAuth}
          onOk={this.handleAuthOk}
          onCancel={this.handleAuthCancel}
          okText='确认'
          cancelText='取消'
        >
           <Tree
            checkable//允许选中
            //onExpand={this.onExpand}//收缩或展开的回调
            //expandedKeys={this.state.expandedKeys}//一上来就展开谁
            //autoExpandParent={this.state.autoExpandParent}//是否展开父节点
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            //onSelect={this.onSelect}
            //selectedKeys={this.state.selectedKeys}
            defaultExpandAll//转开所有节点
          >
            <TreeNode title={'平台功能'} key={'top'} dataRef={''}>
              {this.renderTreeNodes(treeData)}
            </TreeNode>
            {/* {this.renderTreeNodes(treeData)} */}
          </Tree>
        </Modal>
    </div>
    )
  }
}
export default Role
