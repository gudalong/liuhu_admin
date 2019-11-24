import { reqCategories } from "../../api";
import { GET_CATEGORY_SUCCESS } from "../../redux/action-types/category";

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
