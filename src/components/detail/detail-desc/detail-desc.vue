<template>
  <div class="detail-desc">
    <div class="img-wrapper">
      <van-image width="108" height="157" :src="book.cover" lazy-load fit="cover"></van-image>
    </div>
    <div class="desc">
      <div class="title">{{book.title}}</div>
      <div class="author">{{book.author}}</div>
      <div class="sub-title">{{book.categoryText}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      book: {
        type: Object
      }
    },
    data () {
      return {

      }
    },

    components: {},
    created () {},

    computed: {},

    beforeMount () {},

    mounted () {},

    methods: {},

    watch: {}

  }
</script>
<style lang='stylus' scoped>
.detail-desc
  margin 16px 21.5px 0 20px
  display flex
  .img-wrapper
    flex 0 0 108px
    width 108px
  .desc
    flex 1
    margin-left 21.5px
    display flex
    flex-direction column
    .title
      font-size: 18px
      color: #333333
      font-weight 600
      line-height 32px
      margin-top 10px
      max-width 210px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    .author
      font-size 16px
      margin-top 6px
      color #333333
      max-width 205px
      line-height 22.5px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    .sub-title
      font-size 14px
      line-height 20px
      margin-top 12px
      color: #868686
      max-width 205px
      max-height 44px
      overflow hidden
      text-overflow ellipsis
</style>
