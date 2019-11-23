import axios from 'axios'
import {
  message
} from 'antd'
import codeMessage from '../configs/code-message'
import store from '../redux/store'
import {removeItem} from '../utils/storage'
import {removeUserSuccess} from '../redux/action-creators/user'
import history from '../utils/history'

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
  //服务器响应成功的时候触发的
  ({
    data
  }) => {
    if (data.status === 0) {
      //登录成功
      return (data.data)
    } else {
      //登录失败
      message.error(data.msg);   //提示
      return Promise.reject(data.msg)   //return返回错误信息
    }
  },
  //响应失败的时候触发
  (error) => {
    let errorMessage = ''

    if (error.response) {
      //在响应信息中如果有response，就说明服务器返回了响应，但是因为各种原因，返回的是错误代码
      errorMessage = codeMessage[error.response.status]
      
      if(error.message.status === 401){
        //401说明token绝对有问题，需要清除localstorage和redux中的token ，并且定向到‘/login’
        removeItem();
        store.dispatch(removeUserSuccess());
        //因为不是在render中所以用history来进行跳转网址
        history.push('/login')
      }

    } else {
      //在响应信息中如果没有response，就说明服务器根本没有返回响应，就根据返回的messag判断是什么失误，多因为网络错误
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