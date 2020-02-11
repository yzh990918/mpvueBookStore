<template>
<div>
  <div class="home" v-if="authLoginFlag">
    <searchBox :hotSearch="hotsearch" @oncatchclick="Search"></searchBox>
    <div class="Homecard">
    <Homecard @Bookdetail="changeTodetail"></Homecard>
    </div>
    <Homebanner></Homebanner>
    <div class="Homebook">
        <Homebook @ToDetail="Todetail" @onMoreclick="LoadingMore('recommend')" linearBg  mode="row" :row="1" :col="3" :data="recommend"  title="为你推荐" btnText="换一批"></Homebook>
    </div>
     <div class="Homebook">
        <Homebook @ToDetail="Todetail" @onMoreclick="LoadingMore('freeRead')"   mode="col" :row="2" :col="2" :data="freeread"  title="免费阅读" btnText="换一批"></Homebook>
    </div>
     <div class="Homebook">
        <Homebook @ToDetail="Todetail" @onMoreclick="LoadingMore('hotRead')"  mode="row" :row="1" :col="4" :data="hotBook"  title="当前最热" btnText="换一批"></Homebook>
    </div>
     <div class="Homebook">
        <Homebook  @onMoreclick="Totype" :row="3" :col="2" :data="category"  title="图书分类" btnText="查看全部"></Homebook>
    </div>
  </div>
  <auth v-if="!authLoginFlag" @getUserInfo="init"></auth>
  <div class="loading" v-if="!recommend.length > 0 && !freeread.length > 0 && !hotBook.length > 0 && !category.length > 0 && authLoginFlag">
    <l-loading show="true" type="flash" size="large"></l-loading>
  </div>
</div>
  
</template>
<script>
import searchBox from '../../components/base/search-box/search-box'
import Homecard from '../../components/Home/Homecard'
import Homebanner from '../../components/Home/Homebanner'
import Homebook from '../../components/Home/Homebook'
import {getHomeData, getrecommend, getfreeRead, gethotBook, register} from '../../api/index.js'
import {getsetting, getUserInformation, setStorageSync, getStorageSync, getOpenId} from '../../api/wechat'
import auth from '../../components/base/auth/auth'
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
      authLoginFlag: true
    }
  },
  components: {searchBox, Homecard, Homebanner, Homebook, auth},
  created () {},

  computed: {},

  beforeMount () {},

  mounted () {
    // this.getHomeInfo()
    // this.getsetting()
    this.init()
  },

  methods: {
    getHomeInfo (openId) {
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
    getsetting () {
      getsetting('userInfo', () => {
        this.authLoginFlag = true
        this.getUserInfo()
      }, () => {
        this.authLoginFlag = false
      })
    },
    getUserInfo () {
      getUserInformation((userInfo) => {
        console.log(userInfo)
        setStorageSync('usnerInfo', userInfo)
        const openId = getStorageSync('openId')
        if (!openId || openId.length === 0) {
          getOpenId()
        } else {
          // 已获得openid的回调执行
          this.getHomeInfo(openId)
          register(openId, userInfo)
        }
      },
      () => {
        console.log('failed')
      }
      )
    },
    init () {
      this.getsetting()
    },
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
    }
  },

  watch: {}

}
</script>
<style lang='stylus' scoped>
.home
  .Homebook
    margin-top 23px
.loading
  position absolute
  left 50%
  z-index 700
  top 50%
  transform translate3d(-50%,-50%,0)
</style>
