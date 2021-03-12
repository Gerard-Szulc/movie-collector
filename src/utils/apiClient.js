import axios from 'axios'
axios.defaults.baseURL = 'https://api.themoviedb.org/4'
axios.defaults.headers.common.Authorization = `Bearer ${process.env.VUE_APP_API_AUTH_TOKEN}`

export const request = (url, method, data, options) => {
  return axios.request({
    url: url,
    method: method,
    data: data,
    ...options
  })
}
