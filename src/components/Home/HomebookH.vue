<template>
  <div class="home-book" :class="linearStl" ref="homeBook">
    <div class="home-book-header"
       >当前最热</div>
    <div class="home-book-content">
      <div class="home-book-row"
           v-for="(item,index) in bookData"
           :key="index">
        <div class="home-book-col"
             :style="{flex :'0 0 '+(100/col)+'%'}"
             v-for="(book,index1) in item"
             :key="index1">
          <div class="home-book-wrapper"
               :style="{flexDirection : Mode ==='col' ?'row':'column'}"
               v-if=" Mode==='row'|| Mode==='col'">
            <van-image @click="ToDetail(book)" v-if="Mode === 'row' && colStyle"  width="101" height="147" fit="cover" lazy-load :src="book.cover"></van-image>
              <van-image @click="ToDetail(book)" v-if="Mode === 'row' && !colStyle"  width="68" height="99" fit="cover" lazy-load :src="book.cover"></van-image>
             <van-image @click="ToDetail(book)" v-if="Mode === 'col'" width="64" height="88" fit="cover" lazy-load :src="book.cover"></van-image>
            <div class="book-title-wrapper book-title-row"
                 v-if="Mode === 'row'">
              <div class="book-title">
                {{book.title}}
              </div>
            </div>
            <!-- 两栏布局 -->
            <div class="book-title-wrapper book-title-col"
                 v-if="Mode === 'col'">
              <div class="book-title">
                {{book.title}}
              </div>
              <div class="book-author">
                {{book.author}}
              </div>
              <div class="book-cate">
                {{book.categoryText}}
              </div>
            </div>
          </div>
          <div class="category-wrappper"
               @click.stop="toTypeList(book)"
               v-if="Mode==='cate'">
                   <div class="cate-text">{{book.text}}</div>
            <div class="cate-num">{{book.num}}本书</div>
          
            <div class="image-wrapper">
              <div class="img1">
                <imageview :src="book.cover"></imageview>
              </div>
              <div class="img2">
                <imageview :src="book.cover2"></imageview>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="home-book-footer"
         >
      <l-button shape="semicircle"
      @click="onMoreclick"
                color="#ffffff"
                height="82"
                size="large"
                plain="true">换一批</l-button>
    </div>
  </div>
</template>

<script>
import imageview from '../../components/base/image-view/image-view'
import {CATEGORY} from '../../utils/config'
export default {
  name: '',
  props: {
    title: {
      type: String,
      default: '为你推荐'
    },
    data: {
      type: Array,
      default: []
    },
    btnText: {
      type: String,
      default: '查看更多'
    },
    row: {
      type: Number,
      default: 0
    },
    col: {
      type: Number,
      default: 1
    },
    // 排版方式 row col cate
    mode: {
      type: String,
      default: 'cate'
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    linearBg: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      Mode: '',
      Col: 0
    }
  },

  components: { imageview },
  created () {},

  computed: {
    colStyle () {
      if (this.col === 3) {
        return true
      } else {
        return false
      }
    },
    bookData () {
      // 将数组数据结构转换成想要的数据结构(传入行列)
      if (this.data && this.data.length > 0) {
        this.data.forEach((item) => {
          // 增加中文分类名属性
          item.text = CATEGORY[item.categoryText.toLowerCase()]
        })
        const number = this.row * this.col
        const _bookdata = this.data.slice(0, number)
        const _BookDataByRow = []
        let _row = 0
        while (_row < this.row) {
          _BookDataByRow.push(
            _bookdata.slice(_row * this.col, _row * this.col + this.col)
          )
          _row++
        }
        return _BookDataByRow
      } else {
        return []
      }
    },
    linearStl () {
      if (this.Mode === 'row') {
        return 'background'
      } else {
        return ''
      }
    }
  },

  beforeMount () {},

  mounted () {
    this.Mode = this.mode
    this.Col = this.col
  },

  methods: {
    onMoreclick () {
      this.$emit('onMoreclick')
    },
    ToDetail (book) {
      this.$emit('ToDetail', book)
    },
    toTypeList (book) {
      this.$router.push({
        path: '/pages/Booklist/main',
        query: {
          item: book.category,
          key: 'categoryId',
          title: book.categoryText
        }
      })
    }
  },

  watch: {}
}
</script>
<style lang='stylus' scoped>
.home-book
  &.background
    background-image: linear-gradient(-180deg, #FFFFFF 0%, #F9F9F9 100%);
  .home-book-header
    padding: 13px 0 0 20.5px
    font-size: 21px
    font-weight: 600
    color: #212933
  .home-book-content
    padding: 0 12px
    margin-top: 10.5px
    .home-book-row
      display: flex
      flex-flow: row nowrap
      margin-top: 12px
      .home-book-col
        padding: 0 8px
        box-sizing: border-box
        .home-book-wrapper
          display: flex
          .book-title-wrapper
            &.book-title-row
              .book-title
                font-size: 12px
                color: #212731
                line-height: 16.5px
                font-weight: 500
                overflow: hidden
                max-height: 33px
                word-break: break-word
            &.book-title-col
              flex: 0 0 50%
              padding: 10px
              display: flex
              flex-direction: column
              justify-content: space-between
              .book-title
                font-size: 14px
                color: #212731
                line-height: 14px
                max-height: 28px
                overflow: hidden
                word-break: break-word
                font-weight: 500
              .book-author
                font-size: 12px
                line-height: 14px
                color: #999
                margin-top: 10px
                max-height: 14px
                overflow: hidden
                word-break: break-word
                font-weight: 500
              .book-cate
                font-size: 12px
                line-height: 14px
                color: #999
                max-height: 14px
                overflow: hidden
                word-break: break-word
                font-weight: 500
        .category-wrappper
          position relative
          display flex
          flex-direction column
          background #F8F9FB
          height 96px
          border-radius 10px
          padding 13px 0 14.5px 16px
          box-sizing border-box
          justify-content space-between
          .cate-text
            color #212832
            font-size 16px
            line-height 22.5px
            font-weight 500
            width 100px
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
          .cate-num
            color #868686 
            font-size 12px
            line-height 16.5px
          .image-wrapper
            position absolute
            right 0
            bottom 0
            .img1
              position absolute
              right 0
              bottom -3px
              z-index 100
              width 40px
            .img2
              position absolute
              right 30px
              bottom -3px
              z-index 90
              width 36px
  .home-book-footer
    margin-top: 12px
    padding: 0 10px
</style>
