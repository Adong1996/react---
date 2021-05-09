import {INCREMENT, DECREMENT} from './action_type.js'
let initStore = 0;
export default function operaCount(perState = initStore, action) {
  console.log(action);
  let {type, data} = action
  let newState
  switch (type) {
    case INCREMENT:
       newState = perState + data
      return newState;
    case DECREMENT:
       newState = perState - data
      return newState;
    default:
      return perState;
  }
  
}