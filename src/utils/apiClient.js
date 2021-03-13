import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_HOST_URL
axios.defaults.headers.common.Authorization = `Bearer ${process.env.VUE_APP_API_AUTH_TOKEN}`

export const request = (url, method, options = {}, data) => {
  return axios.request({
    url: url,
    method: method,
    data: data,
    ...options
  })
}
