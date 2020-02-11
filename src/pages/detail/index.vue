<template>
  <div class="detail">
    <detailDesc :book="data"></detailDesc>
    <detailCount :data="data" :reader="this.readers" :readerNum="readerNum" :rankNum="rankNum" :rankAvg="rankAvg" :rateValue="rateValue" 
     @rate="hanlderate"
    ></detailCount>
    <detailContent :contents="contents"></detailContent>
    <detailBottom @hanldeShelf="handleshelf" :isInShelf="isOnShelf"></detailBottom>
    <van-dialog id="van-dialog"></van-dialog>
    <l-message content="content"></l-message>
    <div class="loading" v-show="!readers.length || !contents.length">
       <l-loading
       type="rotate"
       bg-color="#f3f3f3"
       z-index="900"
       show="true"
       full-screen="true"
       >
    </l-loading>
    </div>
  </div>
</template>
<script>
import dialog from 'vant-weapp/dist/dialog/dialog'
import detailDesc from '../../components/detail/detail-desc/detail-desc'
import detailCount from '../../components/detail/detail-count/detail-count'
import detailBottom from '../../components/detail/detail-bottom/detail-bottom'
import {getBookDeatil, Rate, getBookContents, getShellInfo, addBookToShell, deleteBookFromShell} from '../../api/index'
import {getStorageSync} from '../../api/wechat'
import detailContent from '../../components/detail/detail-catalogue/detail-catalogue'
export default {
  name: '',
  props: [''],
  data () {
    return {
      data: {},
      readers: [],
      readerNum: 0,
      rankNum: 0,
      rankAvg: 0,
      rateValue: 0,
      contents: [],
      isOnShelf: false
    }
  },

  components: {detailDesc, detailCount, detailContent, detailBottom},
  created () {},

  computed: {},

  beforeMount () {},

  mounted () {
    this.openId = getStorageSync('openId')
    this.getDetail()
    getBookContents({
      fileName: this.$route.query.fileName
    }).then((res) => {
      this.contents = res.data.data
    })
  },

  methods: {
    getDetail () {
      getBookDeatil({
        fileName: this.$route.query.fileName,
        openId: this.openId
      }).then((res) => {
        this.readers = res.data.data.readers
        console.log(this.readers)
        const { readerNum, rankNum, rankAvg } = res.data.data
        this.data = res.data.data
        this.readerNum = readerNum
        this.rankNum = rankNum
        this.rankAvg = rankAvg
      }).catch(() => {}
      )
    },
    hanlderate (value) {
      this.rateValue = value
      Rate({
        fileName: this.$route.query.fileName,
        openId: this.openId,
        rank: value
      }).then(() => {
        this.getDetail()
      })
    },
    getBookIsInShelf () {
      getShellInfo({
        fileName: this.$route.query.fileName,
        openId: this.openId
      }).then((res) => {
        const {data} = res.data
        if (data.length === 0) {
          this.isOnShelf = false
        } else {
          this.isOnShelf = true
        }
      })
    },
    handleshelf () {
      if (!this.isOnShelf) {
        addBookToShell({
          fileName: this.$route.query.fileName,
          openId: this.openId
        }).then(() => {
          this.getBookIsInShelf()
        })
        mpvue.lin.showMessage({
          type: 'success',
          content: '加入书架成功'
        })
      } else {
        dialog.confirm({
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          message: '确定将这本书移出书架吗'
        }).then(() => {
          deleteBookFromShell({
            fileName: this.$route.query.fileName,
            openId: this.openId
          }).then(() => {
            this.getBookIsInShelf()
          })
          mpvue.lin.showMessage({
            type: 'error',
            content: '书籍已从书架移除'
          })
        }).catch(() => {
        })
      }
    }
  },

  watch: {}

}
</script>
<style lang='stylus' scoped>

</style>
