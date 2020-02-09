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
