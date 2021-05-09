import React,{Component} from 'react'

import {createIncrementAction,createDecrementAction} from './redux/action_creators.js'


export default class App extends Component{
  componentWillMount() {
    console.log(this.props.store.getState());
  }
  increment = () => {
    let {value} = this.refs.selectNumber
    this.props.store.dispatch(createIncrementAction(value*1))
  }
  decroment = () => {
    let {value} = this.refs.selectNumber
    this.props.store.dispatch(createDecrementAction(value*1))
  }
  incrementIfOdd = () => {
    let count = this.props.store.getState()
    if(count%2 === 1){
      let {value} = this.refs.selectNumber
      this.props.store.dispatch(createIncrementAction(value*1))
    }
  }
  incrementAsync = () => {
    
    setTimeout(() => {
      let {value} = this.refs.selectNumber
      this.props.store.dispatch(createIncrementAction(value*1))
    },1000)
  }
  render(){
    let count = this.props.store.getState()
    
    return (
      <div>
        <h1>当前计数为{count}</h1>
        <select ref='selectNumber'>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decroment}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
        <button onClick={this.incrementAsync}>increment async</button>&nbsp;
      </div>
    )
  }
}
