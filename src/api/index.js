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

// 获取读书详情
export function getBookDeatil (parmas) {
  const url = HOST + '/book/detail'
  return get(url, parmas)
}

// 获取读书目录
export function getBookContents (params) {
  const url = HOST + '/book/contents'
  return get(url, params)
}

// 获取读书存储书架状态
export function getShellInfo (params) {
  const url = HOST + '/book/shelf/get'
  return get(url, params)
}

// 为读书评分
export function Rate (params) {
  const url = HOST + '/book/rank/save'
  return get(url, params)
}

// 加入书架
export function addBookToShell (params) {
  const url = HOST + '/book/shelf/save'
  return get(url, {
    shelf: JSON.stringify(params)
  })
}

// 移出书架
// 这里传递的参数是shelf 是个json字符串 ,需要转成String
export function deleteBookFromShell (params) {
  const url = HOST + '/book/shelf/remove'
  return get(url, {
    shelf: JSON.stringify(params)
  })
}

// 获取图书列表
export function getBooklist (params) {
  const url = HOST + '/book/search-list'
  return get(url, params)
}

// 获取书架列表
export function getShelfList (params) {
  const url = HOST + '/book/shelf/get'
  return get(url, params)
}
export function getUserJoindays (params) {
  const url = HOST + '/user/day'
  return get(url, params)
}

// 获取分类列表
export function getcatalogueList (params) {
  const url = HOST + '/book/category/list/v2'
  return get(url, params)
}

// 获取歌曲播放路径
export function getMusic (musicId) {
  const url = `https://music.linkorg.club/song/url?id=${musicId}`
  return get(url)
}

// 获取推荐歌曲列表
export function getrecommendList () {
  const url = 'https://music.linkorg.club/top/list?idx=0'
  return get(url)
}

export function getLyric (id) {
  const url = `https://music.linkorg.club/lyric?id=${id}`
  return get(url)
}

// 歌曲详情
export function getmusicDetail (id) {
  const url = `https://music.linkorg.club/song/detail?ids=${id}`
  return get(url)
}
