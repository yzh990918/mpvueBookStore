<template>
 <scroll-view scroll-y class="scrollPage">
  <view class="UCenter-bg">
    <image src="https://i.loli.net/2020/02/14/DYUQ3lbxtOIeV19.jpg" class="png" mode="widthFix"></image>
    <view class="text-xl title">东理悦读
      <text class="text-df">v1.0</text>
    </view>
    <image src="https://raw.githubusercontent.com/weilanwl/ColorUI/master/demo/images/wave.gif" mode="scaleToFill" class="gif-wave"></image>
  </view>
   <view class="cu-list menu margin-bottom-xl shadow-lg radius">
    <view class="cu-item">
      <view class="content user">
         <div class="cu-avatar radius lg avatar " ref="avatar" :style="{backgroundImage : 'url'+'('+userInfo.avatarUrl+')'}">
          <view class="cu-tag badge" :class="userInfo.gender===2 ? 'cuIcon-female bg-pink':'cuIcon-male bg-blue'" ></view>
        </div>
        <div class="userinfo">
          <div class="userName">{{userInfo.nickName}}</div>
          <div class="desc text-grey" >阅读等级:书虫一枚</div>
        </div>
      </view>
    </view>
   </view>
  <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
    <view class="cu-item arrow" @click="ToAbout" >
      <navigator class="content" hover-class="none">
        <text class="cuIcon-info text-blue"></text>
        <text class="text-grey">关于</text>
      </navigator>
    </view>
      <view class="cu-item arrow"  @click="ToNotice">
      <navigator class="content" hover-class="none">
        <text class="cuIcon-notificationfill text-pruple"></text>
        <text class="text-grey">通告</text>
      </navigator>
    </view>
    <view class="cu-item arrow" @clcik="ToFavoriate">
      <navigator class="content"  hover-class="none">
        <text class="cuIcon-favorfill text-red" ></text>
        <text class="text-grey">个人收藏</text>
      </navigator>
    </view>
    <view class="cu-item arrow" @click="Tolog">
      <navigator class="content"  hover-class="none">
        <text class="cuIcon-formfill text-cyan"></text>
        <text class="text-grey">日志</text>
      </navigator>
    </view>
    <view class="cu-item arrow" @clcik="ToAttention">
      <navigator class="content" hover-class="none">
        <text class="cuIcon-like text-pink"></text>
        <text class="text-grey">我的关注</text>
      </navigator>
    </view>
    <view class="cu-item arrow">
      <button class="cu-btn content" open-type="feedback">
        <text class="cuIcon-writefill text-orange"></text>
        <text class="text-grey">意见反馈</text>
      </button>
    </view>
     <view class="cu-item arrow" >
       <navigator class="content" @clcik="ToHonner" hover-class="none">
        <text class="cuIcon-upstage text-yellow"></text>
        <text class="text-grey">荣誉</text>
      </navigator>
  </view>
  <view class="cu-item arrow" @click="showImage">
       <navigator class="content" hover-class="none">
        <text class="cuIcon-vipcard text-brown"></text>
        <text class="text-grey">赞赏作者</text>
      </navigator>
  </view>
  <view class="cu-item arrow" @click="changeColor">
       <navigator class="content" hover-class="none">
        <text class="cuIcon-clothes text-redLight"></text>
        <text class="text-grey">个性换肤</text>
      </navigator>
  </view>
   <l-message content="content"></l-message>
  </view>
 
</scroll-view>
</template>

<script>
import {getStorageSync} from '../../api/wechat'
export default {
  name: '',
  props: [''],
  data () {
    return {
      userInfo: {}
    }
  },

  components: {},
  created () {},

  computed: {
  },

  beforeMount () {},

  mounted () {
    this.userInfo = getStorageSync('usnerInfo')
  },

  methods: {
    ToAbout () {
      this.$router.push('/pages/about/main')
    },
    ToNotice () {
      this.$router.push('/pages/attention/main')
    },
    Tolog () {
      this.$router.push('/pages/log/main')
    },
    ToFavoriate () {
      mpvue.lin.showMessage({
        content: '该功能努力开发中',
        duration: '3000'
      })
    },
    // 关注
    ToAttention () {
      mpvue.lin.showMessage({
        content: '该功能努力开发中',
        duration: '3000'
      })
    },
    ToHonner () {
      mpvue.lin.showMessage({
        content: '暂未获得荣誉',
        duration: '3000'
      })
    },
    showImage () {

    },
    changeColor () {
      mpvue.lin.showMessage({
        content: '该功能努力开发中',
        duration: '3000'
      })
    }
  },

  watch: {}

}
</script>
<style lang='stylus' scoped>
.UCenter-bg {
  background-image: url(https://cdn.nlark.com/yuque/0/2019/jpeg/223589/1551665278734-assets/web-upload/47c7dc58-b900-4e24-a1ac-ee8fdb9ada70.jpeg);
  background-size: cover;
  height: 550rpx;
  display: flex;
  justify-content: center;
  padding-top: 40rpx;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  align-items: center;
  color:rgb(54, 131, 214);
  font-weight: 400;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}
.title
  margin-top 8px
.user
  display flex
  padding 10px
  .avatar
    margin-top 5px
  .userinfo
    margin-left 18px
    display flex
    margin-top 13px
    vertical-align top
    flex-direction column
    .userName
      color #333
      font-weight 400
      font-size 15px
      line-height 16px
    .desc
      margin-top 4px
      font-size 12px
.UCenter-bg text {
  margin-top 4px
  opacity: 0.8;
}

.UCenter-bg image {
  width: 200rpx;
  height: 200rpx;
  border-radius 50%
}

.UCenter-bg .gif-wave{
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;  
  height: 100rpx;   
}

map,.mapBox{
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;  
  height: 100rpx;   
}

map,.mapBox{
  width: 750rpx;
  height: 300rpx;
}

</style>
