<template>
  <div class="homecard">
    <div class="homecard-wrapper">
      <div class="user-info">
        <div class="avatar" v-if="loginflag">
        <van-image
        :src="avatar"
        round
        lazy-load
       fit="cover"
       width="20"
       height="20"
        ></van-image>
        </div>
          <div class="avatar" v-if="!loginflag">
        <van-image
        src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
        round
        lazy-load
       fit="cover"
       width="20"
       height="20"
        ></van-image>
        </div>
         <span v-if="loginflag" class="nickName">{{nickName}}</span>
                <span v-else class="nickName">游客登录</span>
      <span class="shelf-desc" v-if="loginflag">书架共有三本好书</span>
           <span class="shelf-desc" v-else>亲亲需要您登录哦</span>
      <div class="split"></div>
      <span class="shelf-desc right">特别精选</span>
      </div>
      <div class="book-info">
        <div class="book-img-wrapper" v-if="loginflag">
          <div @click="ToBookdeatil(item)" class="img-wrapper" v-for="(item,index) of shelf" :key="index">
            <van-image fit="cover" width="72"  height="101" lazy-load  :src="item.cover">
          </van-image>
          </div>
        </div>
         <div class="book-img-wrapper" v-else>
          <div @click="ToBookdeatil(item)" class="img-wrapper" v-for="(item,index) of mockshelflist" :key="index">
            <van-image fit="cover" width="72"  height="101" lazy-load  :src="item.cover">
          </van-image>
          </div>
        </div>
        <div class="book-shelf" @click="goToShelf">
          <span class="title">书架</span>
          <l-icon class="icon" name="right" size="24" color="#ccc"></l-icon>
        </div>
      </div>
      <div class="feedback-wrapper" @click="feed">
       反馈
      </div>
    </div>
    <l-message content="content"></l-message>
  </div>
</template>
<script>
import imageview from '../base/image-view/image-view'
import {getHomeData} from '../../api/index'
import {getStorageSync} from '../../api/wechat'
export default {
  name: '',
  props: {
    data: {
      type: Array,
      default: []
    },
    hasSign: {
      type: Boolean,
      default: false
    },
    signDay: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      shelf: [],
      avatar: '',
      nickName: '',
      loginflag: true,
      testflag: true,
      mockshelflist: [
        {
          'id': 67,
          'fileName': '2018_Book_Nanoinformatics',
          'cover': 'https://www.youbaobao.xyz/book/res/img/MaterialsScience/978-981-10-7617-6_CoverFigure.jpg',
          'title': 'Nanoinformatics',
          'author': 'Isao Tanaka',
          'publisher': 'Springer Singapore',
          'bookId': '2018_Book_Nanoinformatics',
          'category': 15,
          'categoryText': 'MaterialsScience',
          'language': 'en',
          'rootFile': 'OEBPS/package.opf'
        },
        {
          'id': 38,
          'fileName': '2018_Book_DesigningSustainableTechnologi',
          'cover': 'https://www.youbaobao.xyz/book/res/img/Environment/978-3-319-66981-6_CoverFigure.jpg',
          'title': 'Designing Sustainable Technologies, Products and Policies',
          'author': 'Enrico Benetto',
          'publisher': 'Springer International Publishing',
          'bookId': '2018_Book_DesigningSustainableTechnologi',
          'category': 6,
          'categoryText': 'Environment',
          'language': 'en',
          'rootFile': 'OEBPS/package.opf'
        },
        {
          'id': 12,
          'fileName': '2018_Book_RESTARTSustainableBusinessMode',
          'cover': 'https://www.youbaobao.xyz/book/res/img/BusinessandManagement/978-3-319-91971-3_CoverFigure.jpg',
          'title': 'RESTART Sustainable Business Model Innovation',
          'author': 'Sveinung Jørgensen',
          'publisher': 'Springer International Publishing',
          'bookId': '2018_Book_RESTARTSustainableBusinessMode',
          'category': 13,
          'categoryText': 'BusinessandManagement',
          'language': 'en',
          'rootFile': 'OEBPS/package.opf'
        }
      ]
    }
  },

  components: {imageview},

  computed: {},
  beforeCreate () {
  },
  beforeMount () {},
  onShow () {
    this.getInfo()
  },
  onLoad () {
    this.ISlogin()
    this.getUserInfo()
    this.getshelf()
  },
  methods: {
    ISlogin () {
      let login = false
      const userInfo = getStorageSync('usnerInfo')
      if (userInfo !== undefined && userInfo.nickName) {
        login = true
      } else {
        login = false
      }
      this.loginflag = login
    },
    getInfo () {
      let userflag = false
      let login = false
      const userInfo = getStorageSync('usnerInfo')
      if (userInfo !== undefined && userInfo.nickName) {
        userflag = true
        login = true
      } else {
        userflag = false
        login = false
      }
      this.loginflag = login
      console.log(this.loginflag)
      // 用户授权了 切换到首页加载数据
      if (userflag && !this.shelf.length) {
        this.getUserInfo()
        this.getshelf()
      } else {
      }
    },
    getUserInfo () {
      const userInfo = getStorageSync('usnerInfo')
      const {nickName, avatarUrl} = userInfo
      this.avatar = avatarUrl
      this.nickName = nickName
    },
    getshelf () {
      const openId = getStorageSync('openId')
      getHomeData({openId}).then(res => {
        this.shelf = res.data.data.shelf
      })
    },
    goToShelf () {
      mpvue.switchTab({
        url: '/pages/shell/main'
      })
    },
    selectBook () {},
    sign () {},
    feed () {
      mpvue.lin.showMessage({
        content: '反馈功能正在开发中',
        duration: 3000
      })
    },
    ToBookdeatil (item) {
      this.$emit('Bookdetail', item)
    }
  },

  watch: {}

}
</script>
<style lang='stylus' scoped>
.homecard
  background-image: linear-gradient(90deg, #54575F 0%, #595B60 100%);
  border-radius 15px
  box-sizing border-box
  margin 27px 20px 20px 20px
  position relative
  .homecard-wrapper
    display flex
    flex-direction column
    padding 20px
    .user-info
      display flex
      align-items center
      .avatar
        width 20px
        height 20px
      span
        display inline-block
        vertical-align middle
        font-size 12px
      .nickName
        color #FFF
        margin-left 10px
      .shelf-desc
        color #ffffff
        margin-left 8.5px
        opacity .7
        &.right
          max-width 40px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
      .split
        display flex
        align-items center
        width 4px
        height 4px
        background #A2A2A2
        border-radius 50% 
        margin-left 8px
      .shelf-desc
        margin-left 8px
    .book-info
      margin-top 18.5px
      display flex
      .book-img-wrapper
        flex 1
        display flex
        .img-wrapper
          width 72px
          height 101px
          margin-left 20px
          &:nth-child(1)
            margin-left 0
      .book-shelf
        flex 0 0 auto
        margin-left 15px
        display flex
        align-items center
        .title
          width 12px
          font-size 12px
          line-height 14px
          word-break break-word
          color #f4f4f4
          opacity .8
        .icon
          display inline-block
          vertical-align middle
          width 15px
          margin-left 3px
  .feedback-wrapper
    position absolute
    right 0
    top 19px
    width 44.5px
    height 23.5px
    background #707070
    border-radius: 50px 0 0 50px
    text-align center
    font-size 10px
    color #FFFFFF
    line-height 20px


  
</style>
