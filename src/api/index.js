
import axiosInstance from './request'

//发送登录请求
export const reqLogin = (username, password) => {
  return axiosInstance({
    method: "POST",
    url: "/login",
    data: {
      username,
      password
    }
  })
}
//发送获取分类列表请求
export const reqCategories = () => {
  return axiosInstance({
    method: "GET",
    url: "/category/get"
  })
}
//发送添加分类列表请求
export const addCategory = (categoryName)=>{
  return axiosInstance({
    method:'POST',
    url:'/category/add',
    data:{
      categoryName
    }
  })
}

//发送修改分类列表请求
export const updateCategory = (categoryId,categoryName)=>{
  return axiosInstance({
    method:'POST',
    url:'/category/update',
    data:{
      categoryId,
      categoryName
    }
  })
}

//发送删除分类列表请求
export const deleteCategory = (categoryId)=>{
  return axiosInstance({
    method:'POST',
    url:'/category/delete',
    data:{
      categoryId
    }
  })
}

//发送获取商品列表请求
export const getProducts = (pageNum,pageSize)=>{
  return axiosInstance({
    method:'GET',
    url:'/product/list',
    params:{    //get请求不能用data，需要用params
      pageNum,
      pageSize
    }
  })
}



