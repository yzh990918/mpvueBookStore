<template>
  <div class="detail-bottom">
    <div class="btn-wrapper">
      <l-button width="320" height="80"
      @click="hanldeShelf"
       :l-class="isInShelf ? 'Notexit':'exit'" shape="circle">
       {{isInShelf ? '移除书架':'加入书架' }}
       </l-button>
    </div>
    <div class="btn-wrapper">
      <l-button 
      @click="readBook"
      width="320" height="80"
      l-class="read" shape="circle">阅读</l-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      isInShelf: {
        type: Boolean
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

    methods: {
      hanldeShelf () {
        this.$emit('hanldeShelf')
      },
      readBook () {
        this.$emit('readbook')
      }
    },

    watch: {}

  }
</script>
<style lang='stylus' scoped>
.detail-bottom
  position fixed
  bottom 0
  width 100%
  height 60px
  background #fff
  display flex
  box-sizing border-box
  align-items center
  padding 0 15px
  border-top 1px solid #eee
  box-shadow 0 -2px 4px 0 rgba(0,0,0,.1)
  .btn-wrapper
    flex 1
    margin-right 15px
</style>

<style lang="stylus">
.detail-bottom
  .exit
    width 100%
    color #1EA3F5
    background #fff
    border 1px solid #1EA3F5
    border-radius 22.5px
  .Notexit
    width 100%
    color #F96128
    background rgba(255, 175, 155, .3)
    border 1px solid #FFAF9B
    border-radius 22.5px
  .read
    width: 100%
    border: none
    color: #fff
    background: #1EA3F5
    border-radius 22.5px
</style>
