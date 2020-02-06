<template>
  
    <div class="swipper-wrapper">
      <swiper class="swipper" indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500">
        <swiper-item  v-for="(item,index) of swiperList" :key="index">
          <img class="swipper-item" mode="widthFix"  :src="item.imageUrl"/>
        </swiper-item>
      </swiper>
    </div>

</template>

<script>
import {get} from '../../utils/http'
export default {
  name: '',
  props: [''],
  data () {
    return {
      swiperList: []
    }
  },
  components: {},
  created () {},

  computed: {},

  beforeMount () {},

  mounted () {
    this.getSwipperList()
  },

  methods: {
    getSwipperList () {
      get('http://neteasemusic.yangxiansheng.top/banner').then((res) => {
        this.swiperList = res.data.banners
      })
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
    .swipper
      .swipper-item
        width 100%
        height 100%
        border-radius 15px
</style>
