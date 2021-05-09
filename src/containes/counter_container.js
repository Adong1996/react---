import Counter from '../components/counter.jsx'
import {connect} from 'react-redux'

import {createIncrementAction,createDecrementAction} from '../redux/action_creators.js'

/* function mapStateToprops(state) {
  return {
    count:state
  }
  
}
function mapDispatchToProps(dispatch) {
  return {
    increment: (value) => {dispatch(createIncrementAction(value))},
    decrement: (value) => {dispatch(createDecrementAction(value))},
  }
}
export default connect(mapStateToprops,mapDispatchToProps)(Counter) */

// 简写
export default connect(
  state => ({count:state}),
  {
    increment: createIncrementAction,
    decrement: createDecrementAction
  }
)(Counter)