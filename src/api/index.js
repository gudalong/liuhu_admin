
import axiosInstance from './request'

const reqLogin = (username, password) => {
  return axiosInstance({
    method: "POST",
    url: "/login",
    data: {
      username,
      password
    }
  })
}

export  default reqLogin

