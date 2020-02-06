function createFly () {
  // 判断平台
  if (mpvuePlatform === 'wx') {
    const Fly = require('flyio/dist/npm/wx')
    return new Fly()
  } else {
    return null
  }
}
function hanldeError (err) {
  console.log(err)
}
// 封装get请求
export function get (url, params = {}) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.get(url, params).then(response => {
        console.log(response)
        resolve(response)
      }).catch(err => {
        hanldeError(err)
        reject(err)
      })
    })
  }
}

// 封装post请求
export function post (url, params = {}) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.post(url, params).then((response) => {
        console.log(response)
        resolve(response)
      }).catch(err => {
        hanldeError(err)
        reject(err)
      })
    })
  }
}
