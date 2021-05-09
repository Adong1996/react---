import React,{Component} from 'react'


export default class Counter extends Component{
  componentWillMount() {
    console.log(this.props);
  }
  increment = () => {
    let {value} = this.refs.selectNumber
    this.props.increment(value*1)
  }
  decroment = () => {
    let {value} = this.refs.selectNumber
    this.props.decrement(value*1)
  }
  incrementIfOdd = () => {
    let count = this.props.count
    if(count%2 === 1){
      let {value} = this.refs.selectNumber
      this.props.increment(value*1)
    }
  }
  incrementAsync = () => {
    
    setTimeout(() => {
      let {value} = this.refs.selectNumber
      this.props.increment(value*1)
    },1000)
  }
  render(){
    return (
      <div>
        <h1>当前计数为{this.props.count}</h1>
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
