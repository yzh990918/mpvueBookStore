<template>
  <div class="search-item" @click="onClick">
    <div class="search-icon">
<div class="icon-wrapper">
  <l-icon :name="icon" color="rgba(0,0,0,.5)" size="40"></l-icon>
</div>
    </div>
    <div class="info">
      <div class="title">{{title}}</div>
      <div class="sub-title">{{subTitle}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      title: String,
      subTitle: String,
      icon: String
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

    methods: {
      onClick () {
        this.$emit('selectItem')
      }
    },

    watch: {}

  }
</script>
<style lang='stylus' scoped>
.search-item
  margin 22px auto 22px 15px
  display flex
  .search-icon
    width 32px
    height 32px
    .icon-wrapper
      width 100%
      height 100%
      border-radius 50%
      background #F7F7F9
      display flex
      justify-content center
      align-items center
  .info
    margin-left 10px
    vertical-align top
    display flex
    flex-direction column
    .title
      font-size 14px
      color #333333
      line-height 20px
    .sub-title
      font-size 12px
      color rgba(0,0,0,.45)
</style>
