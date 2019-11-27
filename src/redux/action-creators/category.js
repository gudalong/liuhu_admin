import {
  reqCategories,
  addCategory,
  updateCategory,
  deleteCategory
} from "../../api";
import {
  GET_CATEGORY_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS
} from "../../redux/action-types/category";




//异步获取分类列表
const getCategorySuccess = categories => ({
  type: GET_CATEGORY_SUCCESS,
  data: categories
});
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
const addCategorySuccess = categoryName => ({
  type: ADD_CATEGORY_SUCCESS,
  data: categoryName
});
export const addCategoryAsync = (categoryName) => {
  return dispatch => {
    return addCategory(categoryName)
      .then(response => {
        const action = addCategorySuccess(response);
        dispatch(action);
      });
  };
};

//异步修改分类列表
const updateCategorySuccess = (category) => ({
  type: UPDATE_CATEGORY_SUCCESS,
  data: category

});
export const updateCategoryAsync = (categoryId, categoryName) => {
  return dispatch => {
    return updateCategory(categoryId, categoryName)
      .then(response => {
        setTimeout(() => {
          const action = updateCategorySuccess(response)
          dispatch(action);
        }, 500)

      });
  };
};

//异步删除分类列表
const deleteCategorySuccess = (categoryId) => ({
  type: DELETE_CATEGORY_SUCCESS,
  data: categoryId
});
export const deleteCategoryAsync = (categoryId) => {
  return dispatch => {
    return deleteCategory(categoryId)
      .then(response => {
        setTimeout(() => {
          const action = deleteCategorySuccess(response)
          dispatch(action);
        }, 210)
      });
  };
};