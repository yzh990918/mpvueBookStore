<template>
  <div class="book">
    <web-view :src="url" ></web-view>
  </div>
</template>

<script>
  // import Epub from 'epubjs'
  // global.ePub = Epub
  export default {
    name: '',
    props: [''],
    data () {
      return {
        book: {},
        url: ''

      }
    },

    components: {},
    created () {
    },

    computed: {},

    beforeMount () {},
    onShow () {
    },
    mounted () {
      wx.setNavigationBarTitle({
        title: this.$route.query.title
      })
      this.url = `https://ecutread.yangxiansheng.top/reader/${this.$route.query.fileName}`
    },

    methods: {
      // todo: 开发阅读器 上线并将接口文件全部添加进入
    },

    watch: {}

  }
</script>
<style lang='stylus' scoped>

</style>
