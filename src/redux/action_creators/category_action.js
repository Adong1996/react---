import {SAVE_CATEGORY_LIST} from '../action_types.js'

export const createsaveCategoryListAction = (value) => {
  return {type:SAVE_CATEGORY_LIST,data:value}
}