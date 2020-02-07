<template>
<div>
  <div class="home" v-if="authLoginFlag">
    <searchBox :hotSearch="hotsearch"></searchBox>
    <Homecard></Homecard>
    <Homebanner></Homebanner>
    <div class="Homebook">
        <Homebook @onMoreclick="LoadingMore('recommend')" linearBg  mode="row" :row="1" :col="3" :data="recommend"  title="为你推荐" btnText="换一批"></Homebook>
    </div>
     <div class="Homebook">
        <Homebook @onMoreclick="LoadingMore('freeRead')"   mode="col" :row="2" :col="2" :data="freeread"  title="免费阅读" btnText="换一批"></Homebook>
    </div>
     <div class="Homebook">
        <Homebook @onMoreclick="LoadingMore('hotRead')"  mode="row" :row="1" :col="4" :data="hotBook"  title="当前最热" btnText="换一批"></Homebook>
    </div>
     <div class="Homebook">
        <Homebook :row="3" :col="2" :data="category"  title="图书分类" btnText="查看全部"></Homebook>
    </div>
  </div>
  <auth v-if="!authLoginFlag" @getUserInfo="init"></auth>
</div>
  
</template>
<script>
import searchBox from '../../components/base/search-box/search-box'
import Homecard from '../../components/Home/Homecard'
import Homebanner from '../../components/Home/Homebanner'
import Homebook from '../../components/Home/Homebook'
import {getHomeData, getrecommend, getfreeRead, gethotBook} from '../../api/index.js'
import {getsetting, getUserInformation} from '../../api/wechat'
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
    getHomeInfo () {
      getHomeData({openId: '1234'}).then((res) => {
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
      },
      () => {
        console.log('failed')
      }
      )
    },
    init () {
      this.getsetting()
      this.getHomeInfo()
    }
  },

  watch: {}

}
</script>
<style lang='stylus' scoped>
.Homebook
  margin-top 23px
</style>
