<template>
<div>
  <div class="player" >
<div class="normal-player" :style="[{top:CustomBar + 'px'}]">
  <!-- 背景图 -->
  <div class="background">
    <div class="img-wrapper" v-if="currentSong.id">
    <img width="100%" height="100%" :src="currentSong.picUrl" />
    </div>
    <div class="img-wrapper" v-else>
    <img width="100%" height="100%" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" />
    </div>
  </div>
  <!-- 顶部标题 -->
  <div v-if="currentSong.id" class="top">
    <h1 class="title">
      {{currentSong.name}}
    </h1>
    <h2 class="subtitle" >{{currentSong.singer}}</h2>
  </div>
   <div v-else class="top">
    <h1 class="title">
      悦读音乐
    </h1>
    <h2 class="subtitle" >读书与音乐更配哦</h2>
  </div>
  <!-- 中间部分cd唱片 歌曲歌词 -->
  <div class="middle"
  >
    <div class="middle-l" ref="middleL">
      <div class="cd-wrapper" ref="cdWrapper">
        <div v-if="currentSong.id" class="cd" :class="cdCLs" >
          <img class="image" :src="currentSong.picUrl" alt="">
        </div>
        <div v-else class="cd" :class="cdCLs" >
          <img class="image" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="">
        </div>
        <div class="play-lyric-wrapper">
          <div class="playing-lyric" style="color:#bdc3c7">
           歌词功能即将上线
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 底部进度条 歌曲操作 -->
  <div class="bottom">
    <!-- 进度条 -->
    <div class="progress-wrapper">
      <span class="time time-l">{{current}}</span>
      <div class="progress-bar-wrapper">
        <van-slider bar-height="4px"  :max="duration" active-color="#34495e" inactive-color="#7f8c8d" :value="time"  @drag="onChange"/>
      </div>
      <span class="time time-r">{{durationTime}}</span>
    </div>
    <!-- 操作区 -->
    <div class="operators">
      <div class="icon i-left" >
        <i style="font-size:30px" class="iconfont" @click="changeMode" :class="iconMode" ></i>
      </div>
      <div class="icon i-left" >
        <i @click="prev" class="iconfont iconshangyishou"></i>
      </div>
      <div @click="tooglePlay" class="icon i-center">
        <i :class="playIcon" class="iconfont"></i>
      </div>
      <div class="icon i-right">
        <i @click="next" class="iconfont iconxiayishou"></i>
      </div>
      <div class="icon i-right" @click="showPopu" >
        <i style="font-size:30px" class="iconfont iconbofangliebiao"></i>
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
  <div class="title" style="padding-left:15px">
    播放列表{{recommendlist.length}}
  </div>
   	<div class="cu-list menu-avatar">
				<div @click="selectmusic(item,index)" class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in recommendlist " :key="index"
			:data-target="'move-box-' + index">
					<div class="cu-avatar round lg" :style="[{backgroundImage:'url('+ (item.al.picUrl) +')'}]"></div>
					<div class="content">
						<div class="text-white text-lg">{{item.name}}</div>
						<div class="text-white text-df">
							<text class="cuIcon-profile text-blue  margin-right-xs"></text> {{item.ar[0].name}}</div>
					</div>
					<div class="action">
						<div class="text-gray text-sm">{{item.al.name}}</div>
					</div>
				</div>
			</div>
</div>

</van-popup>
<van-toast id="van-toast" />
</div>
  </div>
</div>

</template>

<script>
import {playerMixin} from '../../utils/mixin'
import {getrecommendList} from '../../api/index'
import {playMode} from '../../utils/config'
import {shuffle} from '../../utils/util'
import Toast from 'vant-weapp/dist/toast/toast'
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
      currentShow: 'cd',
      currntsong: {},
      show: false,
      duration: 0,
      playMusicItem: {},
      innerAudioContext: {},
      time: 0,
      lyric: '',
      CustomBar: 0,
      songindex: 0
    }
  },

  components: {
  },

  computed: {
    current () {
      let time = this.format(this.playingTime)
      return time
    },
    durationTime () {
      let time = this.format(this.duration)
      return time
    },
    precent () {
      return this.currentTime / this.songsTime
    },
    cdCLs () {
      return this.isplay ? 'play' : 'play pause'
    },
    playIcon () {
      return !this.isplay ? 'iconbofang1' : 'iconzhengzaibofang'
    },
    iconMode () {
      return this.mode === playMode.sequence ? 'iconshunxu' : this.mode === playMode.loop ? 'icondanquxunhuan' : 'iconsuiji'
    }
  },
  beforeMount () {},
  created () {
    this.getSonglist()
    this.innerAudioContext = wx.getBackgroundAudioManager()
  },
  mounted () {
    this.value = this.playingTime
    this.$nextTick(() => {
      setTimeout(() => {
        this.songindex = this.currentSong.index
        if (this.songindex === -2) {
          console.log(this.flag)
          if (this.innerAudioContext.currentTime > 0 && this.flag === false) {
            console.log('同一首歌曲哦')
            this.play(this.currentSong)
          } else {
            this.innerAudioContext.stop()
            setTimeout(() => {
              this.play(this.currentSong)
            }, 300)
          }
        }
      }, 1000)
    })
  },
  methods: {
    onChange (event) {
      this.innerAudioContext.seek(event.mp.detail.value)
    },
    showPopu () {
      this.show = true
    },
    onClose () {
      this.show = false
    },
    selectmusic (item, index) {
      const {id, name, ar: [{name: singer}], al: {name: album, picUrl}} = item
      this.playMusicItem = {
        id,
        name,
        singer,
        picUrl,
        album,
        index,
        src: `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      }

      this.setCurrentSong(this.playMusicItem)
      this.setflag(true)
      if (this.flag) {
        this.play(this.currentSong)
      }
    },

    // 获取歌曲列表并且将歌曲对象改造
    getSonglist () {
      getrecommendList().then((res) => {
        this.recommendlist = res.data.playlist.tracks
        this.setSequenceList(this.recommendlist)
        this.setPlaylist(this.recommendlist)
      })
    },
    play (item) {
      this.time = 0
      Toast.loading({
        mask: true,
        message: '加载中...'
      })
      this.innerAudioContext.title = item.name
      this.innerAudioContext.autoplay = true
      this.innerAudioContext.src = item.src
      this.innerAudioContext.play()
      this.innerAudioContext.onPlay(() => {
        // 正在播放
        this.setIsplay(true)
        this.setTime(0)
      })
      this.innerAudioContext.onPause(() => {
      })
      this.innerAudioContext.onError(res => {
        console.log(res.errMsg)
      })
      this.innerAudioContext.onTimeUpdate(() => {
        this.currentTime = this.innerAudioContext.currentTime
        this.duration = this.innerAudioContext.duration
        this.setTime(this.currentTime)
        this.time = this.currentTime
      })
      this.innerAudioContext.onCanplay(() => {
        Toast.clear()
        this.duration = this.innerAudioContext.duration
        this.songReady = true
      })

      this.innerAudioContext.onEnded(() => {
        if (this.mode === playMode.loop) {
          this.innerAudioContext.loop = true
          this.setTime(this.innerAudioContext.currentTime)
        } else {
          this.next()
        }
        this.time = 0
      })
    },
    tooglePlay () {
      if (this.isplay) {
        this.innerAudioContext.pause()
        this.setTime(this.innerAudioContext.currentTime)
        this.setIsplay(false)
      } else {
        this.innerAudioContext.play()
        this.setTime(this.innerAudioContext.currentTime)
        this.setIsplay(true)
      }
    },
    // 格式化时间
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
    // 下一首播放
    next () {
      this.setTime(0)
      if (!this.songReady) {
        return
      }
      let index = this.currentSong.index + 1
      if (index === this.playlist.length) {
        index = 0
      }
      setTimeout(() => {
        this.selectmusic(this.playlist[index], index)
      }, 300)
      if (!this.isplay) {
        this.tooglePlay()
      }
    },
    prev () {
      this.setTime(0)
      if (!this.songReady) {
        return
      }
      let index = this.currentSong.index - 1
      if (index === -1) {
        index = this.playlist.length - 1
      }
      setTimeout(() => {
        this.selectmusic(this.playlist[index], index)
      }, 300)
      if (!this.isplay) {
        this.tooglePlay()
      }
    },
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (this.mode === playMode.random) {
        list = shuffle(this.sequencelist)
        setTimeout(() => {
          // this.resetCurrentIndex(list)
          this.setPlaylist(list)
        }, 300)
      } else {
        list = this.sequencelist
        // this.resetCurrentIndex(list)
        this.setPlaylist(list)
      }
    }
  },
  watch: {
    // playing (val) {
    //   if (val === true) {
    //     this.play(this.currentSong)
    //   }
    // }
  }

}
</script>
<style lang='stylus' scoped>
.player
  .normal-player
    position fixed
    left 0
    right  0
    bottom 0
    z-index 150
    top 0
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
          color #bdc3c7
          i
            font-size 30px
        .i-left
          text-align right
          font-size 22px
        .i-center
          padding 0 20px
          text-align center
          i
            font-size 40px
        .i-right
          text-align left
          margin-top -5px
      .progress-wrapper
        display flex
        align-items center
        width 80%
        margin-left auto 
        margin-right auto
        margin-bottom 10px
        padding 10px 0
        .time
          color:#bdc3c7
          font-size 12px
          flex 0 0 30px
          line-height 1.875rem
          width 1.875rem
          &.time-l
            text-align left
          &.time-r
            text-align right
        .progress-bar-wrapper
          flex 1


</style>
<style lang="stylus">
.van-popup 
  background-color #222!important;
  position relative
.wrapper
  padding 15px
  background-color #222!important;
.list-wrapper
  .title
    font-size 18px
    color #ffffff
    margin-bottom 6px
.cu-list.menu-avatar>.cu-item
  background-color #222!important;
  /* 将keyframes写在stylus里面，mpvue编译不出来 */
</style>
<style>
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
  .van-slider__button{
    width: 10px!important;
    height: 10px!important;
    background-color:#bdc3c7!important;

  }
   
  
</style>
