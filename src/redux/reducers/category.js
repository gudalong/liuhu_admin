import {
  GET_CATEGORY_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS
} from '../action-types/category'
const initState = []

function categories(prevState = initState, action) {
  switch (action.type) {
    case DELETE_CATEGORY_SUCCESS:
      return prevState.filter((category) => category._id !== action.data)
      
    case UPDATE_CATEGORY_SUCCESS:
      return prevState.map((category) => {
        if (category._id === action.data._id) {
          return action.data
        }
        return category
      })
    case ADD_CATEGORY_SUCCESS:
      return [...prevState, action.data]
    case GET_CATEGORY_SUCCESS:
      return action.data
    default:
      return prevState;
  }
}
export default categories;