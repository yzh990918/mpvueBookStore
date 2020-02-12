<template>
  <div class="search-list">
    <div class="search-list-wrapper">
      <div class="search-table" 
      v-for="(item,index) in booklist" 
      :key="index"
       @click="selectbook(item)"
      >
        <div class="image-wrapper">
          <van-image width="47" height="68.5" lazy-load fit="cover" :src="item.cover"></van-image>
        </div>
        <div class="book-desc">
          <div class="title">{{item.title}}</div>
          <div class="author">{{item.author}}</div>
          <div class="cate">{{item.categoryText}}</div>
        </div>
      </div>

    </div>
       <div class="loading" v-if="showLoading && booklist.length > 0">
         <l-loadmore line="true" color="#3963bc"  show="true" type="loading"  loading-text="努力加载中"></l-loadmore>
    </div>
     <div class="loading" v-if="showBottom && booklist.length > 0">
         <l-loadmore line="true" show="true" type="end"  end-text="我也是有底线的(end)"></l-loadmore>
    </div>
       </div>
</template>

<script>
import {getBooklist} from '../../api/index'
export default {
  name: '',
  data () {
    return {
      booklist: [],
      page: 1,
      showLoading: false,
      showBottom: false

    }
  },

  components: {},
  created () {},

  computed: {},

  beforeMount () {},

  mounted () {
    this.page = 1
    this.getlist()
    console.log(this.$route.query.title)
    mpvue.setNavigationBarTitle({
      title: this.$route.query.title
    })
  },
  onReachBottom () {
    this.page++
    const { item, key } = this.$route.query
    const params = {}
    const pageKey = 'page'
    if (item && key) {
      params[key] = item
      params[pageKey] = this.page
    }
    getBooklist(params).then((res) => {
      const {data} = res.data
      if (data && data.length > 0) {
        this.booklist.push(...data)
        this.showLoading = true
        this.showBottom = false
      } else {
        this.showBottom = true
        this.showLoading = false
      }
    })
  },
  methods: {
    selectbook (item) {
      const {fileName} = item
      this.$router.push({
        path: '/pages/detail/main',
        query: {
          fileName
        }
      })
    },
    getlist () {
      const { item, key } = this.$route.query
      const params = {}
      const pageKey = 'page'
      if (item && key) {
        params[key] = item
        params[pageKey] = this.page
      }
      getBooklist(params).then((res) => {
        this.booklist = res.data.data
      })
    }
  },

  watch: {}

}
</script>
<style lang='stylus' scoped>
.search-list
  position relative
  .search-list-wrapper
    padding 16px
    .search-table
      display flex
      margin-top 28.5px
      .image-wrapper
        width 47px
        height 68.5px
        margin-right 15.5px
      .book-desc
        display flex
        vertical-align top
        flex-direction column
        .title
          font-size 16px
          color #333333
          line-height 26px
          max-width 240px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .author
          font-size 13px
          margin-top 4px
          max-width 200px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          color rgba(0,0,0,.65)
          line-height 18px
        .cate
          font-size 13px
          margin-top 2px
          color rgba(0,0,0,0.45)
          line-height 18px
  .loading
    position absolute
    width 100%
    z-index 10000
    background #fff
    left 50%
    transform translateX(-50%)
          



</style>
