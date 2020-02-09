import {getOpen} from './index'
// 检测用户是否授权
export function getsetting (auth, onSuccess, onFail) {
  mpvue.getSetting(
    {
      success (res) {
        // 判断是否具备权限 具备就回调onSuccess
        if (res.authSetting[`scope.${auth}`]) {
          onSuccess(res)
        } else {
          onFail(res)
        }
      }
    },
    {
      fail (res) {}
    }
  )
}

// 获取用户信息
export function getUserInformation (onSuccess, onFail) {
  mpvue.getUserInfo({
    success (res) {
      const {userInfo} = res
      if (userInfo) {
        onSuccess(userInfo)
      } else {
        onFail(res)
      }
    }
  }, {
    fail (res) {
      console.log(res)
    }
  }
  )
}

// 设置本地储存用户信息
export function setStorageSync (key, data) {
  mpvue.setStorageSync(key, data)
}

// 获取本地用户信息
export function getStorageSync (key) {
  return mpvue.getStorageSync(key)
}

// 获取openID 方法
export function getOpenId (callback) {
  mpvue.login(
    {
      success (res) {
        if (res.code) {
          getOpen(res.code).then((response) => {
            // 解构出openid
            const {data: {data: {openid}}} = response
            console.log(openid)
            setStorageSync('js_code', res.code)
            setStorageSync('openId', openid)
            // openid 获取成功回调
            callback && callback(openid)
          }).catch((error) => {
            // 拿不到的情况
            console.log(error)
          })
        } else {
        }
      }
    },
    {
      fail (res) {
        console.log(res)
      }
    }
  )
}

// 加载交互
export function showLoading (title) {
  mpvue.showLoading({
    title,
    mask: true
  })
}
export function hideLoading () {
  mpvue.hideLoading()
}
