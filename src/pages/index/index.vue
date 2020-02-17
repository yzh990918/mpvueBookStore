<template>
<div class="index">
<div class="home" @click="showMessage">
  <div class="top">
  <div class="search">
    <searchBox :showbtn="false" :hotSearch="hotsearch" @oncatchclick="Search"></searchBox>
  </div>
  </div>
    <div class="Homecard">
    <Homecard @Bookdetail="changeTodetail"></Homecard>
    </div>
    <Homebanner></Homebanner>
   <div class="book-wrapper">
      <HomebookR @ToDetail="Todetail" @onMoreclick="LoadingMore('recommend')" linearBg  mode="row" :row="1" :col="3" :data="recommend"   btnText="换一批"></HomebookR>
   </div>
   <div class="book-wrapper">
      <HomebookF @ToDetail="Todetail" @onMoreclick="LoadingMore('freeRead')"   mode="col" :row="2" :col="2" :data="freeread"   btnText="换一批"></HomebookF>
   </div>
   <div class="book-wrapper">
      <HomebookH @ToDetail="Todetail" @onMoreclick="LoadingMore('hotRead')"  mode="row" :row="1" :col="4" :data="hotBook"  btnText="换一批"></HomebookH>
   </div>
   <div class="book-wrapper">
        <HomebookC  @onMoreclick="Totype" :row="3" :col="2" :data="category"  btnText="查看全部"></HomebookC>
   </div>
  </div>
  <div class="loading" v-if="!recommend.length > 0 && !freeread.length > 0 && !hotBook.length > 0 && !category.length > 0 ">
    <l-loading show="true" type="flash" size="large"></l-loading>
  </div>
  <van-toast id="van-toast"/>
</div>
  
</template>
<script>
import Toast from 'vant-weapp/dist/toast/toast'
import searchBox from '../../components/base/search-box/search-box'
import Homecard from '../../components/Home/Homecard'
import Homebanner from '../../components/Home/Homebanner'
import HomebookC from '../../components/Home/HomebookC'
import HomebookF from '../../components/Home/HomebookF'
import HomebookH from '../../components/Home/HomebookH'
import HomebookR from '../../components/Home/HomebookR'
import {getHomeData, getrecommend, getfreeRead, gethotBook} from '../../api/index.js'
import {getStorageSync} from '../../api/wechat'

export default {
  name: '',
  props: [''],
  data () {
    return {
      data: {},
      hotsearch: null,
      recommend: [],
      freeread: [],
      hotBook: [],
      category: [],
      cardlist: [],
      Rtitle: '为你推荐'
    }
  },
  components: {searchBox, Homecard, Homebanner, HomebookC, HomebookR, HomebookH, HomebookF},
  created () {},

  computed: {},

  beforeMount () {},

  onLoad () {
    this.openId = getStorageSync('openId')
    this.getHomeInfo()
  },
  onShow () {
    this.getInfo()
  },

  methods: {
    getInfo () {
      let userflag = false
      const userInfo = getStorageSync('usnerInfo')
      if (userInfo !== undefined) {
        userflag = true
      } else {
        userflag = false
      }
      if (userflag && !this.hotBook.length) {
        setTimeout(() => {
          this.getHomeInfo()
          this.Rtitle = '推荐'
        }, 300)
      } else {
      }

      console.log(userflag && !this.category.length)
    },
    getHomeInfo () {
      const openId = getStorageSync('openId')
      getHomeData({openId}).then((res) => {
        const {
          data: {
            hotSearch,
            recommend,
            freeRead,
            hotBook,
            category
          }
        } = res.data
        this.hotsearch = hotSearch.keyword
        this.recommend = recommend
        this.freeread = freeRead
        this.hotBook = hotBook
        this.category = category
      }).catch(() => {
      })
    },
    LoadingMore (key) {
      switch (key) {
        case 'recommend':
          getrecommend().then((res) => {
            this.recommend = res.data.data
          })
          break
        case 'freeRead':
          getfreeRead().then((res) => {
            this.freeread = res.data.data
          })
          break
        case 'hotRead':
          gethotBook().then((res) => {
            this.hotBook = res.data.data
          })
          break
      }
    },
    // getsetting () {
    //   getsetting('userInfo', () => {
    //     this.authLoginFlag = true
    //     this.getUserInfo()
    //   }, () => {
    //     this.authLoginFlag = false
    //   })
    // },
    // getUserInfo () {
    //   getUserInformation((userInfo) => {
    //     console.log(userInfo)
    //     setStorageSync('usnerInfo', userInfo)
    //     const openId = getStorageSync('openId')
    //     if (!openId || openId.length === 0) {
    //       getOpenId()
    //     } else {
    //       // 已获得openid的回调执行
    //       this.getHomeInfo(openId)
    //       register(openId, userInfo)
    //     }
    //   },
    //   () => {
    //     console.log('failed')
    //   }
    //   )
    // },
    // init () {
    //   this.getsetting()
    // },
    Search () {
      this.$router.push('/pages/Search/main')
    },
    Totype () {
      mpvue.switchTab({
        url: '/pages/type/main'
      })
    },
    Todetail (book) {
      const {fileName} = book
      this.$router.push({
        path: '/pages/detail/main',
        query: {
          fileName
        }
      })
    },
    changeTodetail (book) {
      const {fileName} = book
      this.$router.push({
        path: '/pages/detail/main',
        query: {
          fileName
        }
      })
    },
    showMessage () {
      const userInfo = getStorageSync('usnerInfo')
      if (!userInfo) {
        Toast.fail('需要登录,才能体验完整功能')
      }
    }
  },

  watch: {}

}
</script>
<style lang='stylus' scoped>
.home
  position absolute
  left 0
  bottom 0
  width 100%
  height 100%
  .top
    background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280373/1570687034669-assets/web-upload/a97bae62-3157-46bf-934e-72f629548f70.png);
    background-size: 100% 100%;
    background-repeat no-repeat
    height: 90px;
    padding-left 10px
    padding-top 35px
    display flex
    overflow: hidden;
    position: relative;
    color:rgb(54, 131, 214);
    font-weight: 400;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  .book-wrapper
    margin-top 25px
.loading
  position absolute
  left 50%
  z-index 700
  top 50%
  transform translate3d(-50%,-50%,0)
</style>
