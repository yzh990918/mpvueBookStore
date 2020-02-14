<template>
  <div>
<div class="shelf"> 
   <shelfHeader :num="num" :readDay="readDay" :userInfo="userInfo" ></shelfHeader>
</div>
 
  <shelfList :shelfList="shelfList"></shelfList>
  </div>
</template>

<script>
import shelfHeader from './shelf-header'
import shelfList from './shelf-list'
import {getUserJoindays, getShelfList} from '../../api/index'
import {getStorageSync} from '../../api/wechat'
export default {
  name: '',
  props: [''],
  data () {
    return {
      num: 0,
      readDay: 0,
      userInfo: {},
      shelfList: []
    }
  },
  components: {shelfHeader, shelfList},
  created () {},

  computed: {},

  beforeMount () {
    const openId = getStorageSync('openId')
    this.userInfo = getStorageSync('usnerInfo')
    getUserJoindays({openId}).then((res) => {
      this.readDay = res.data.data.day
    })
    getShelfList({openId}).then((res) => {
      this.num = res.data.data.length
      this.shelfList = res.data.data
      this.shelfList.push({})
    })
  },

  onShow () {
    const openId = getStorageSync('openId')
    this.userInfo = getStorageSync('usnerInfo')
    getUserJoindays({openId}).then((res) => {
      this.readDay = res.data.data.day
    })
    getShelfList({openId}).then((res) => {
      this.num = res.data.data.length
      this.shelfList = res.data.data
      this.shelfList.push({})
    })
  },

  methods: {
  },

  watch: {}

}
</script>
<style lang='stylus' scoped>
</style>
