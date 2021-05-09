/* function createIncrementAction(value) {
  return {type:'increment',data:value}
} */
import {INCREMENT, DECREMENT} from './action_type.js'

export const createIncrementAction = value => ({type:INCREMENT,data:value});
export const createDecrementAction = value => ({type:DECREMENT,data:value});