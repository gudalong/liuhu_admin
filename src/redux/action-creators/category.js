import { reqCategories,addCategory } from "../../api";
import { GET_CATEGORY_SUCCESS, ADD_CATEGORY_SUCCESS } from "../../redux/action-types/category";

const getCategorySuccess = categories => ({
  type: GET_CATEGORY_SUCCESS,
  data: categories
});

const addCategorySuccess = categoryName=> ({
  type: ADD_CATEGORY_SUCCESS,
  data: categoryName
});
//异步获取分类列表
export const getCategoryAsync = () => {
  return dispatch => {
    return reqCategories()
    .then(response => {
      const action = getCategorySuccess(response);
      dispatch(action);
    });
  };
};


//异步添加分类列表
export const addCategoryAsync = (categoryName) => {
  return dispatch => {
    return addCategory(categoryName)
    .then(response => {
      const action = addCategorySuccess(response);
      dispatch(action);
    });
  };
};