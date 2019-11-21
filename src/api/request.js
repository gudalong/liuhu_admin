import axios from 'axios'
import {
  message
} from 'antd'
import codeMessage from '../configs/code-message'
import store from '../redux/store'

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    //公共的请求头参数
  }
});

//请求拦截器，
axiosInstance.interceptors.request.use(
  (config) => {

    //此处的判断以后根据发送的数据是urlencoded还是json来选择写还是不写
    if (config.method === 'post') {
      config.headers['content-type'] = 'application/x-www-form-urlencoded';
      //将对象转换成json数据
      config.data = Object.keys(config.data).reduce((prev, key) => {
        const value = config.data[key];
        return prev + `&${key}=${value}`
      }, '').substring(1);
    }

    //从redux中获取
    const {
      user: {
        token
      }
    } = store.getState()

    if (token) {
      config.headers.authorization = 'Bearer ' + token
    }
    return config
  },
  // (err)=>{
  //   return Promise.reject(err)
  // }
)



//响应拦截器
axiosInstance.interceptors.response.use(
  ({
    data
  }) => {
    if (data.status === 0) {
      return (data.data)
    } else {
      message.error(data.msg);
      return Promise.reject(data.msg)
    }
  },
  (error) => {

    let errorMessage = ''
    if (error.response) {
      errorMessage = codeMessage[error.response.status]
    } else {
      if (error.message.indexof('Network Error') !== -1) {
        errorMessage = '网络连接异常~请检查网络连接'
      } else if (error.message.indexof('timeout') !== -1) {
        errorMessage = '请求连接超时，请移步到网络通畅地区'
      } else {
        errorMessage = '未知错误'
      }
    }
    message.error(errorMessage)
    return Promise.reject(errorMessage)
  }
)


export default axiosInstance