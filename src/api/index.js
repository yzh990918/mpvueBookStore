import {get, post} from '../utils/http'

const HOST = 'https://test.youbaobao.xyz:18081'
const appid = 'wxdcb143e3cf5afacd'
const appsecret = '8a75dfade75690295ab94f82fc25c292'

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

// 封装的方法 获取openId
export function getOpen (code) {
  const url = HOST + '/openId/get'
  return get(url, {
    appId: appid,
    code: code,
    secret: appsecret
  })
}

// 用户注册 保证数据更新
export function register (openId, userInfo) {
  const url = HOST + '/user/register'
  return post(url, {
    openId,
    platform: mpvuePlatform,
    ...userInfo
  })
}

// 获取热门搜索词
export function getHotKey () {
  const url = HOST + '/book/hot-search'
  return get(url)
}

// 根据关键词搜索
export function onSearch (params) {
  const url = HOST + '/book/search'
  return get(url, params)
}
