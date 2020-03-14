<template>
  <div class="book">
  <div id="read"></div>    
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
        book: {}

      }
    },

    components: {},
    created () {
      // this.book = new Epub('./2014_Book_Self-ReportedPopulationHealthA.epub')
      // console.log(this.book)
    },

    computed: {},

    beforeMount () {},
    onShow () {
    },
    mounted () {
      wx.setNavigationBarTitle({
        title: this.$route.query.title
      })
    },

    methods: {
      // todo: 开发阅读器 上线并将接口文件全部添加进入
    },

    watch: {}

  }
</script>
<style lang='stylus' scoped>

</style>
