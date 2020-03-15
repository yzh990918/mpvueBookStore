import {playMode} from '../utils/config'
const state = {
  playing: false, // 播放暂停
  playlist: [], // 播放列表
  sequencelist: [], // 顺序播放的列表
  mode: playMode.sequence, // 默认顺序播放
  currentIndex: -1 // 当前播放的歌曲下标
}
export default state
