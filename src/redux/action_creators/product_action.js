import {SAVE_PRODUCT_LIST} from '../action_types.js'

export const createsaveProductListAction = (value) => {
  return {type:SAVE_PRODUCT_LIST,data:value}
}