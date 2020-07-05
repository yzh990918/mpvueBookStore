<template>
  
    <div class="swipper-wrapper">
      <swiper class="swipper"  circular="true" autoplay="true" interval="5000" duration="500">
        <swiper-item @click="playmusic(item)" v-for="(item,index) of swiperList" :key="index">
          <img class="swipper-item" mode="widthFix"  :src="item.imageUrl"/>
        </swiper-item>
      </swiper>
      <van-toast id="van-toast" />
    </div>
</template>
<script>
import { getmusicDetail } from '../../api/index'
import {get} from '../../utils/http'
import {playerMixin} from '../../utils/mixin'
export default {
  mixins: [playerMixin],
  name: '',
  props: [''],
  data () {
    return {
      swiperList: [],
      playMusicItem: {}
    }
  },
  components: {},

  computed: {},

  beforeMount () {},

  created () {
    this.getSwipperList()
  },

  methods: {
    getSwipperList () {
      get('https://neteasemusic.yangxiansheng.top/banner').then((res) => {
        this.swiperList = res.data.body.banners
      })
    },
    playmusic (item) {
      if (item.targetType === 1) {
        console.log('播放歌曲')
        getmusicDetail(item.targetId).then((res) => {
          const {id, name, ar: [{name: singer}], al: {name: album, picUrl}} = res.data.body.songs[0]
          this.playMusicItem = {
            id,
            name,
            singer,
            picUrl,
            album,
            src: `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
            index: -2
          }
        }).then(() => {
          this.$router.push('/pages/music/main')
          this.setIsplay(true)
          this.setTime(0)
          this.setflag(false)
        })
      } else {
        console.log('这是专辑,不能播放')
      }
      setTimeout(() => {
        this.setCurrentSong(this.playMusicItem)
      }, 700)
      // setTimeout(() => { console.log(this.currentSong) }, 1000)
    }
  },

  watch: {}

}
</script>
<style lang='stylus' scoped>
  .swipper-wrapper
    box-sizing border-box
    width 335px
    height 125px
    margin-left 20px
    border-radius 15px
    overflow hidden
    .swipper
      .swipper-item
        width 100%
        height 100%
        border-radius 15px
</style>
