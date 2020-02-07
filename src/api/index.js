import {get} from '../utils/http'

const HOST = 'https://test.youbaobao.xyz:18081'

// 获取首页信息
export function getHomeData (params) {
  const url = HOST + '/book/home/v2'
  return get(url, params)
}

// 推荐刷新
export function getrecommend () {
  const url = HOST + '/book/home/recommend/v2'
  return get(url)
}
// 免费阅读刷新
export function getfreeRead () {
  const url = HOST + '/book/home/freeRead/v2'
  return get(url)
}
// 最热刷新
export function gethotBook () {
  const url = HOST + '/book/home/hotBook/v2'
  return get(url)
}
