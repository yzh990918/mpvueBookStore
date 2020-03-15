<template>
  <div class="player">
    <transition name="normal-player" >
<div class="normal-player">
  <!-- 背景图 -->
  <div class="background">
    <img width="100%" height="100%" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" />
  </div>
  <!-- 顶部标题 -->
  <div class="top">
    <h1 class="title">
      {{currentSong.name}}演员
    </h1>
    <h2 class="subtitle"  @click="tosinger">{{currentSong.singer}}薛之谦</h2>
  </div>
  <!-- 中间部分cd唱片 歌曲歌词 -->
  <div class="middle"
  >
    <div class="middle-l" ref="middleL">
      <div class="cd-wrapper" ref="cdWrapper">
        <div class="cd" :class="cdCLs" >
          <img class="image" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="">
        </div>
        <div class="play-lyric-wrapper">
          <div class="playing-lyric">
            {{currentLyrictxt}}我真的好想你
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 底部进度条 歌曲操作 -->
  <div class="bottom">
    <!-- 进度条 -->
    <div class="progress-wrapper">
      <span class="time time-l">{{format(currentTime)}}</span>
      <div class="progress-bar-wrapper">
        <progressbar :currentTime="currentTime" :songsTime="songsTime" :precent="precent" @percentChangeEnd="onProgressBarChange"></progressbar>
      </div>
      <span class="time time-r">{{format(songsTime)}}</span>
    </div>
    <!-- 操作区 -->
    <div class="operators">
      <div class="icon i-left" @click="changeMode">
        <i class="iconfont" :class="iconMode" ></i>
      </div>
      <div class="icon i-left">
        <i @click="prev" class="iconfont iconshangyishou"></i>
      </div>
      <div class="icon i-center">
        <i :class="playIcon" class="iconfont" @click="toggleplaying"></i>
      </div>
      <div class="icon i-right" >
        <i @click="next" class="iconfont iconxiayishou"></i>
      </div>
      <div class="icon i-right" @click="showPopu" >
        <i class="iconfont iconbofangliebiao"></i>
      </div>
    </div>
  </div>
  <van-popup
  :show="show"
  round
  position="bottom"
  custom-style="height: 60%;"
  @close="onClose"
>
<div class="list-wrapper wrapper">
  <div class="title">
    播放列表{{recommendlist.length}}
  </div>
   	<div class="cu-list menu-avatar">
				<div class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in recommendlist " :key="index"
			:data-target="'move-box-' + index">
					<div class="cu-avatar round lg" :style="[{backgroundImage:'url('+ (item.al.picUrl) +')'}]"></div>
					<div class="content">
						<div class="text-white">{{item.name}}</div>
						<div class="text-white text-sm">
							<text class="cuIcon-profile text-blue  margin-right-xs"></text> {{item.ar[0].name}}</div>
					</div>
					<div class="action">
						<div class="text-white text-xs">{{item.al.name}}</div>
					</div>
				</div>
			</div>
</div>

</van-popup>
</div>
 </transition>
 
<audio autoplay  ref="audio" @play="ready" @canplay="getDuration"  :src="songsUrl" @timeupdate="UpdateTime" @ended="End"></audio>
  </div>
</template>

<script>
import {playerMixin} from '../../utils/mixin'
import {getMusic, getLyric, getrecommendList} from '../../api/index'
import {playMode} from '../../utils/config'
import {shuffle} from '../../utils/util'
import Lyric from 'lyric-parser'
export default {
  mixins: [playerMixin],
  name: 'player',
  props: [''],
  data () {
    return {
      songsUrl: [],
      // 歌曲信息加载成功
      recommendlist: [],
      songReady: false,
      currentTime: 0,
      songsTime: 0,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: 'cd',
      currentLyrictxt: '',
      show: false
    }
  },

  components: {
  },

  computed: {
    precent () {
      return this.currentTime / this.songsTime
    },
    cdCLs () {
      return this.playing ? 'play' : 'play pause'
    },
    playIcon () {
      return this.playing ? 'iconbofang1' : 'iconzhengzaibofang'
    },
    miniIcon () {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    // disabledCls () {
    //   return this.songReady ? '' : 'disable'
    // },
    iconMode () {
      return this.mode === playMode.sequence ? 'iconshunxu' : this.mode === playMode.loop ? 'icondanquxunhuan' : 'iconsuiji'
    }
  },
  beforeMount () {},
  mounted () {
    this.getSonglist()
  },
  created () {
  },
  methods: {
    showPopu () {
      this.show = true
    },
    onClose () {
      this.show = false
    },
    playMusic (item, index) {
      this.selectPlay(this.recommendlist, index)
    },
    // 获取歌曲列表并且将歌曲对象改造
    getSonglist () {
      getrecommendList().then((res) => {
        this.recommendlist = res.data.playlist.tracks
        console.log(this.recommendlist)
        this.setPlaylist(this.recommendlist)
      })
    },
    ready () {
      this.songReady = true
    },
    selectSong (index) {
      this.setCurrentindex(index)
      this.setPlaying(true)
    },
    firstPlay () {
      this.$refs.audio.play()
    },
    format (inteval) {
      // 向下取整
      inteval = inteval | 0
      let minute = inteval / 60 | 0
      let second = this._pad(inteval % 60)
      return `${minute}:${second}`
    },
    _pad (num, n = 2) {
      // 如果秒的字符串长度小于2 就补0
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    // 更新进度时间
    UpdateTime (e) {
      this.currentTime = e.mp.detail.currentTime
    },

    // 加载完成之后获取播放时间
    getDuration () {
      this.songsTime = this.$refs.audio.duration
      this.songReady = true
    },
    // 播放状态改变 暂停播放
    toggleplaying () {
      if (!this.songReady) {
        return
      }
      this.setPlaying(!this.playing)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    // 下一首播放
    next () {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex + 1
      if (index === this.playlist.length) {
        index = 0
      }
      this.setCurrentindex(index)
      if (!this.playing) {
        this.toggleplaying()
      }
      this.songReady = false
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    // 末尾循环播放
    End () {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    loop () {
      setTimeout(() => {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
      }, 1000)
      if (this.currentLyric) { // 将歌词平移到歌曲的开始
        this.currentLyric.seek(0)
      }
    },
    // 上一首
    prev () {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playlist.length - 1
      }
      this.setCurrentindex(index)
      if (!this.playing) {
        this.toggleplaying()
      }
      this.songReady = false
    },
    // onProgressBarChange (precent) {
    //   // console.log(this.currentTime)
    //   this.$refs.audio.currentTime = this.songsTime * precent
    //   if (!this.playing) {
    //     this.toggleplaying()
    //   }
    //   if (this.currentLyric) { // 将歌词平移到歌曲的开始
    //     this.currentLyric.seek(this.$refs.audio.currentTime * 1000)
    //   }
    // },
    // 改变播放模式
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setMode(mode)
      let list = null
      if (this.mode === playMode.random) {
        list = shuffle(this.sequencelist)
        this.resetCurrentIndex(list)
        this.setsplaylist(list)
      } else {
        list = this.sequencelist
        this.resetCurrentIndex(list)
        this.setsplaylist(list)
      }
    },
    resetCurrentIndex (list) {
      // findIndex是es6的一个语法，接受一个函数，函数可以拿到每一个list元素
      let index1 = list.findIndex((item) => {
        // 将当前歌曲的索引赋值给item的索引
        return item.id === this.currentSong.id
      })
      this.setCurrentindex(index1) // setMutaions方法设置当前的index
    },
    // 获取歌词
    _getLyric (id) {
      getLyric(id).then((res) => {
        // 调用第三方库 将currentLyric转化为一个time-text对象
        this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyric)
        if (this.playing) {
          this.currentLyric.play()
        }
      })
    },
    handleLyric ({lineNum, txt}) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        // 获取到往上偏移第五个位置的p
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 500)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
      this.currentLyrictxt = txt
    }
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!newSong.id) {
        return
      }
      if (newSong.id === oldSong.id) {
        return
      }
      // finished:解决ios声音bug
      getMusic(this.currentSong.id).then((res) => {
        this.songsUrl = res.data.data[0].url
      })
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
      this._getLyric(this.currentSong.id)
    },

    playing (val) {
      const audio = this.$refs.audio
      val ? audio.play() : audio.pause()
    }

  }

}
</script>
<style lang='stylus' scoped>
.player
  .normal-player
    position fixed
    left 0
    right  0
    top 0
    bottom 0
    z-index 150
    background #222
    .background
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      z-index  -1
      opacity 0.6
      filter:blur(20px)
    .top
      position relative
      margin-bottom 25px
      .title
        width 70%
        margin  0 auto
        line-height 40px
        text-align center
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        font-size 18px
        color:#fff
      .subtitle
        line-height 20px
        text-align center
        font-size 15px
        color #fff
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
    .middle
      position fixed
      width 100%
      top 80px
      bottom 170px
      white-space nowrap
      font-size 0
      .middle-r
        display inline-block
        position absolute
        top 0
        vertical-align top
        width 100%
        height 100%
        overflow hidden
        .lyric-wrapper
          width 80%
          margin 0 auto
          overflow hidden
          text-align center
          .text
            line-height 40px
            color rgba(255, 255, 255, 0.3)
            font-size 14px
            &.current
              color:#f1c40f
      .middle-l
        display inline-block
        vertical-align top
        position relative
        width 100%
        height 0
        padding-top 80%
        .cd-wrapper
          position absolute
          left 10%
          top 0
          width  80%
          height 100%
          .playing-lyric
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            color: #fff;
          .cd
            width 100%
            height 100%
            box-sizing border-box
            border-radius 50%
            border: 10px solid rgba(255, 255, 255, 0.1)
            &.play
              animation rotate 20s linear infinite
            &.pause
              animation-play-state paused
            .image
              position absolute
              left 0
              top 0
              width 100%
              height  100%
              border-radius 50%
    .bottom
      position absolute
      bottom 50px
      width 100%
      .operators
        display flex
        align-items center
        .icon
          flex 1
          color #fff
          i
            font-size 30px
        .i-left
          text-align right
        .i-center
          padding 0 20px
          text-align center
          i
            font-size 40px
        .i-right
          text-align left
          margin-top -5px


</style>
<style lang="stylus">
.van-popup 
  background-color #222!important;
.wrapper
  padding 15px
  background-color #222!important;
  .title
    font-size 18px
    color #ffffff
    margin-bottom 6px
.cu-list.menu-avatar>.cu-item
  background-color #222!important;
</style>
