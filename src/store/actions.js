import * as types from './mutations-type'
import {playMode} from '../utils/config'
import {shuffle} from '../utils/util'
function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_PLAYING, true)
}

export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE, list)
  let randomlist = shuffle(list)
  commit(types.SET_CURRENTINDEX, 0)
  commit(types.SET_PLAYLIST, randomlist)
  commit(types.SET_PLAYING, true)
}

// 插入单曲进入playlist 如果以前的有 就插入删除以前的存在的相同歌曲的元素
export const insertSong = function ({commit, state}, song) {
  // 需要使用slice生成一个副本 不然我能在action里面直接修改state里面的参数
  let playlist = state.playlist.slice()
  let sequencelist = state.sequencelist.slice()
  let currentIndex = state.currentIndex
  let currentSong = playlist[currentIndex]
  let fpIndex = findIndex(playlist, song)
  currentIndex++
  playlist.splice(currentIndex, 0, song)
  if (fpIndex > -1) {
    // 当前歌曲索引在以前存在歌曲的后面
    if (currentIndex > fpIndex) {
      // 如果存在歌曲索引在前面 想要删除掉它的索引currentindex必须-1 这时fpIndex才正确
      currentIndex--
      playlist.splice(fpIndex, 1)
    } else {
      // 当存在歌曲在后面 插入歌曲在前面 只需要fpindex+1即可
      playlist.splice(fpIndex + 1, 1)
    }
  }
  // 当前歌曲在sequencelist的索引 因为是顺序列表 所以加一
  let currentSIndex = findIndex(sequencelist, currentSong) + 1
  let fsIndex = findIndex(sequencelist, song)
  sequencelist.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequencelist.splice(fsIndex, 1)
    } else {
      sequencelist.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE, sequencelist)
  commit(types.SET_CURRENTINDEX, currentIndex)
  commit(types.SET_PLAYING, true)
}
