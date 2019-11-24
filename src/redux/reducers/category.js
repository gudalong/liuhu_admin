import {
  GET_CATEGORY_SUCCESS
} from '../action-types/category'
const initState = []

function categories(prevState = initState, action) {
  switch (action.type) {
    case GET_CATEGORY_SUCCESS:
      return action.data
    default:
      return prevState;
  }
}
export default categories;