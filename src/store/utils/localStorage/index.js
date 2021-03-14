const getStorageItem = (key) => {
  return new Promise((resolve, reject) => {
    try {
      const data = window.localStorage.getItem(key)
      resolve(JSON.parse(data))
    } catch (e) {
      reject(e)
    }
  })
}

const setStorageItem = (key, data) => {
  return new Promise((resolve, reject) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(data))
      resolve()
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

export { getStorageItem, setStorageItem }
