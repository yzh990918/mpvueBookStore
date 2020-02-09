<template>
  <div class="search">
    <searchbox ref="box" @confirm="onConfirm" @deleted="deletequery" :focus="true" @onChange="searchbegin"  @onclick="Search"></searchbox>
    <div class="tagGroup-wrapper" v-if="hotkeys.length > 0 && !query">
    <tagGroup title="热门搜索" btnText="换一批" :value="hotkeys"></tagGroup>
    </div>
     <div class="tagGroup-wrapper" v-if="history.length > 0 && !query">
    <tagGroup title="历史搜索" btnText="清空" :value="hotkeys"></tagGroup>
    </div>
    <suggest v-if="query" :data="searchlist"></suggest>
  </div>
</template>

<script>
import searchbox from '../../components/base/search-box/search-box'
import tagGroup from '../../components/Search/Taggroup'
import {getHotKey, onSearch} from '../../api/index'
import suggest from '../../components/Search/suggest'
import {getStorageSync} from '../../api/wechat'
import {debounce} from '../../utils/util'
export default {
  name: '',
  props: [''],
  data () {
    return {
      hotkeys: [],
      history: [],
      searchlist: {},
      query: ''
    }
  },

  components: {searchbox, tagGroup, suggest},
  created () {
    this.$watch('query', debounce((val) => {
      //  空值或者输入空格 return
      if (!val || val.trim().length === 0) {
        this.searchlist = null
        this.query = ''
      }
      onSearch({
        keyword: val,
        openId: this.openId
      }).then((res) => {
        this.searchlist = res.data.data
        console.log(this.searchlist)
      })
    }, 300))
  },

  computed: {
  },

  beforeMount () {},

  mounted () {
    this.openId = getStorageSync('openId')
    this.gethotKey()
  },

  methods: {
    gethotKey () {
      getHotKey().then((res) => {
        this.hotkeys = res.data.data
        console.log(this.hotkeys)
      })
    },
    searchbegin (item) {
      this.query = item
    },
    deletequery () {
      this.query = ''
    },
    onConfirm (item) {
      console.log('c')
      if (this.query) {
        return
      }
      this.$refs.box.addquery('computer')
      this.query = 'computer'
    }
  },

  watch: {
    query (val) {
    }
  }

}
</script>
<style lang='stylus' scoped>
.search
  .tagGroup-wrapper
    margin-top 20px
</style>
