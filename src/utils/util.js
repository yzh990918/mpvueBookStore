// 节流函数
export function debounce (func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function throttle (fn, interval) {
  var enterTime = 0// 触发的时间
  var gapTime = interval || 300 // 间隔时间，如果interval不传，则默认300ms
  return function () {
    var context = this
    var backTime = new Date()// 第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments)
      enterTime = backTime// 赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  }
}

function getRandomInt (min, max) {
  // 取min-max的数据
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function shuffle (arr) {
  // 当前数组值与取到的随机数组值交换 从而打乱数据
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
