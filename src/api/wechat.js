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
