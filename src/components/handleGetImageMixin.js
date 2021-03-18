import axios from 'axios'

export default {
  methods: {
    toDataURL (url) {
      return axios({
        url,
        method: 'get',
        headers: null,
        responseType: 'blob'
      })
        .then(response => {
          return response.data
        })
        .then(blob => new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        }))
    }
  }
}
