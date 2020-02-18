<template>
  <div class="search bg-white" >
    <searchbox ref="box" @confirm="onConfirm" @deleted="deletequery" :focus="focus" @onChange="searchbegin"  ></searchbox>
    <div class="tagGroup-wrapper" v-if="hotkeys.length > 0 && !query">
    <tagGroup @Tobookdetail="todetail" @_handle="changeHotKey" title="热门搜索" btnText="换一批" :value="hotkeys"></tagGroup>
    </div>
     <div class="tagGroup-wrapper" v-if="!query">
    <tagGroup @addinput="addInput" title="历史搜索" btnText="清空" @_handle="clearHistory" :value="history"></tagGroup>
    </div>
    <suggest v-if="query && searchlist" :data="searchlist"></suggest>
    <van-dialog id="van-dialog"></van-dialog>
    <div class="loading" v-if="IsLoading && searchlist && searchlist.book.length > 0">
         <l-loadmore line="true" color="#3963bc"  show="true" type="loading"  loading-text="努力加载中"></l-loadmore>
    </div>
    <div class="full-load" v-show="!hotkeys">
       <l-loading
       type="flip"
       size="large"
       bg-color="#fff"
       z-index="2000"
       show="true"
       full-screen="true"
       >
    </l-loading>
    </div>
    <div class="loading" v-if="isBottom && searchlist && searchlist.book.length > 0">
         <l-loadmore line="true" show="true" type="end"  end-text="我也是有底线的(end)"></l-loadmore>
    </div>
  </div>
</template>

<script>
import searchbox from '../../components/base/search-box/search-box'
import tagGroup from '../../components/Search/Taggroup'
import {getHotKey, onSearch} from '../../api/index'
import suggest from '../../components/Search/suggest'
import {getStorageSync, setStorageSync} from '../../api/wechat'
import dialog from 'vant-weapp/dist/dialog/dialog'
const HISTORY_KEY = '_HSITORY'
export default {

  name: '',
  props: [''],
  data () {
    return {
      hotkeys: [],
      searchlist: {},
      query: '',
      keyword: '',
      page: 1,
      history: [],
      focus: false,
      IsLoading: false,
      isBottom: false
    }
  },

  components: {searchbox, tagGroup, suggest},
  created () {
    this.list = []
  },

  computed: {
  },
  onPageScroll () {
    if (!this.query) {
      return
    }
    this.focus = false
  },
  onReachBottom () {
    let keyword = this.$refs.box.getvalue()
    if (keyword) {
      console.log(this.IsLoading)
      this.page++
      onSearch({
        keyword: keyword,
        openId: this.openId,
        page: this.page
      }).then((res) => {
        const {book} = res.data.data
        if (book && book.length > 0) {
          this.searchlist.book.push(...book)
          this.IsLoading = true
          this.isBottom = false
        } else {
          this.isBottom = true
        }
      })
    }
  },
  beforeMount () {},

  mounted () {
    this.openId = getStorageSync('openId')
    this.gethotKey()
    this.history = getStorageSync(HISTORY_KEY)
    this.query = ''
  },
  // todo: 4.阅读器跳转 5.书架开发 6.个人中心开发
  // error: 登录时需要点击两下按钮才能加载数据
  methods: {
    addInput (item) {
      this.$refs.box.setvalue(item)
      this.query = item
      this.search(item)
      this.focus = true
    },
    todetail (item) {
      this.$router.push({
        path: '/pages/detail/main',
        query: {
          fileName: item
        }
      })
    },
    clearHistory () {
      dialog.confirm({
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        message: '确定要清空历史记录吗'
      }).then(() => {
        this.history = ''
        setStorageSync(HISTORY_KEY, '')
      }).catch(() => {
      })
    },
    changeHotKey () {
      this.gethotKey()
    },
    gethotKey () {
      getHotKey().then((res) => {
        this.hotkeys = res.data.data
      })
    },
    searchbegin (keyword) {
      this.query = keyword
      if (!keyword || keyword.trim().length === 0) {
        this.searchList = null
        return
      }
      this.search(keyword)
    },
    deletequery () {
      this.query = ''
    },
    search (keyword) {
      onSearch({
        keyword,
        openId: this.openId,
        page: this.page
      }).then((res) => {
        if (res && res.data && res.data.error_code === 0) {
          this.searchlist = res.data.data
        }
      })
    },
    onConfirm (keyword) {
      if (!keyword || keyword.trim().length === 0) {
        this.$refs.box.setvalue('computer')
        this.query = 'computer'
        this.search('computer')
      }
      if (!this.history.includes(keyword) && keyword !== '') {
        // 缓存
        console.log(keyword)
        this.list.push(keyword)
        this.history = this.list
        setStorageSync(HISTORY_KEY, this.history)
      }
      this.search(keyword)
    }
  },

  watch: {
  }

}
</script>
<style lang='stylus' scoped>
.search
  position relative
  width 100%
  height 100%
  .tagGroup-wrapper
    margin-top 20px
  .loading
    position absolute
    width 100%
    z-index 10000
    background #fff
    left 50%
    transform translateX(-50%)
</style>
