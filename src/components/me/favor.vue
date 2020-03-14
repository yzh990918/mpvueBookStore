<template>
  <div class="favor">
    <div class="title"></div>
    <div class="content">
      <div class="content-row" v-for="(item,index) in bookData" :key="index">
        <div class="content-col" v-for="(book,index1) in item" :key="index1">
          <div class="book" @click="Todetail(book)">
            <van-image width="125" height="152" :src="book.cover" cover="fit" lazy-load></van-image>
            <div class="bottom">
              <div class="book-title">书名:{{book.title}}</div>
              <div class="author">作者:{{book.author}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      data: {
        type: Array,
        default: []
      },
      row: {
        type: Number,
        default: 0
      },
      col: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
  
      }
    },

    components: {},
    created () {},

    computed: {
      bookData () {
      // 将数组数据结构转换成想要的数据结构(传入行列)
        if (this.data && this.data.length > 0) {
          const number = 10
          const _bookdata = this.data.slice(0, number)
          const _BookDataByRow = []
          let _row = 0
          while (_row < 5) {
            _BookDataByRow.push(
              _bookdata.slice(_row * 2, _row * 2 + 2)
            )
            _row++
          }
          return _BookDataByRow
        } else {
          return []
        }
      }

    },

    beforeMount () {},

    mounted () {
      setTimeout(() => {
        console.log(this.data)
      }, 50)
    },

    methods: {
      Todetail (book) {
        const {fileName} = book
        this.$router.push({
          path: '/pages/detail/main',
          query: {
            fileName
          }
        })
      }
    },

    watch: {}

  }
</script>
<style lang='stylus' scoped>
.favor
  display flex
  flex-direction column
  padding 14px
  .content
    padding 0 14px
    width 100%
    .content-row
      display flex
      flex-flow nowrap row
      margin-top 20px
      .content-col
        box-sizing border-box
        flex 0 0 50%
        .book
          position relative
          width 125px
          height 178px
          margin 0 14px
          box-shadow: -3px .4px 2px #ccc;
          .bottom
            position absolute
            bottom 0
            height 50px
            width 125px
            display flex
            background #fff
            flex-direction column
            // justify-content space-between
            .book-title
              margin-top 8px
              margin-left 8px
              font-size 11px
              font-weight 500
              color #2c3e50
              overflow hidden
              white-space nowrap
              text-overflow ellipsis
            .author
              margin-top -10px
              margin-left 8px
              font-size 10px
              overflow hidden
              white-space nowrap
              text-overflow ellipsis
              color #666

</style>
