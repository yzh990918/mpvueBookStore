<template>
 <scroll-view scroll-y class="scrollPage">
  <view class="UCenter-bg">
    <image src="https://i.loli.net/2020/02/17/qKnZz13REVmvP6x.png" class="png" mode="widthFix"></image>
    <view class="text-xl title">东理悦读
      <text class="text-df">v1.0.1</text>
    </view>
    <image src="https://raw.githubusercontent.com/weilanwl/ColorUI/master/demo/images/wave.gif" mode="scaleToFill" class="gif-wave"></image>
  </view>
   <view class="cu-list menu margin-bottom-xl shadow-lg radius">
        <view class="cu-item" v-if="!showlog">
          <view class="content user">
            <div class="cu-avatar radius lg avatar " ref="avatar" :style="{backgroundImage : 'url'+'('+userInformation.avatarUrl+')'}">
              <view class="cu-tag badge" :class="userInformation.gender===2 ? 'cuIcon-female bg-pink':'cuIcon-male bg-blue'" ></view>
            </div>
            <div class="userinfo">
              <div class="userName">{{userInformation.nickName}}</div>
              <div class="desc text-grey" >阅读等级:书虫一枚</div>
            </div>
          </view>
        </view>
          <view class="us-item" v-if="showlog">
            <view class="cu-bar btn-group">
            <button @getuserinfo="getUserInfo" open-type="getUserInfo" class="cu-btn text-blue line-blue shadow">绑定账号</button>
              </view>
              </view>
              <l-toast/>
   </view>
  <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
    <view class="cu-item arrow" @click="ToAbout" >
      <view class="content" hover-class="none">
        <text class="cuIcon-info text-blue"></text>
        <text class="text-grey">关于</text>
      </view>
    </view>
      <view class="cu-item arrow"  @click="ToNotice">
      <view class="content" hover-class="none">
        <text class="cuIcon-notificationfill text-purple"></text>
        <text class="text-grey">通告</text>
      </view>
    </view>
    <view class="cu-item arrow">
      <view class="content"  @click="ToFavoriate">
        <text class="cuIcon-favorfill text-red" ></text>
        <text class="text-grey">个人收藏</text>
      </view>
    </view>
    <view class="cu-item arrow" @click="Tolog">
      <view class="content">
        <text class="cuIcon-formfill text-cyan"></text>
        <text class="text-grey">日志</text>
      </view>
    </view>
    <view class="cu-item arrow">
      <view class="content" @click="ToAttention">
        <text class="cuIcon-like text-pink"></text>
        <text class="text-grey">我的关注</text>
      </view>
    </view>
    <view class="cu-item arrow">
      <button class="cu-btn content" open-type="feedback">
        <text class="cuIcon-writefill text-orange"></text>
        <text class="text-grey">意见反馈</text>
      </button>
    </view>
     <view class="cu-item arrow" >
       <view class="content"  @click="ToHonner">
        <text class="cuIcon-upstage text-yellow"></text>
        <text class="text-grey">荣誉</text>
      </view>
  </view>
  <view class="cu-item arrow" @click="showImage">
       <view class="content" hover-class="none">
        <text class="cuIcon-vipcard text-brown"></text>
        <text class="text-grey">赞赏作者</text>
      </view>
  </view>
  <view class="cu-item arrow" @click="changeColor">
       <view class="content" hover-class="none">
        <text class="cuIcon-clothes text-pink"></text>
        <text class="text-grey">个性换肤</text>
      </view>
  </view>
      <view class="cu-item arrow">
      <button class="cu-btn content" open-type="share">
        <text class="cuIcon-share text-red"></text>
        <text class="text-grey">分享</text>
      </button>
    </view>
   <l-message content="content"></l-message>
   <van-dialog id="van-dialog"></van-dialog>
   <!-- <van-popup show="Show" position="bottom"  closeable round custom-style="height: 20%" @close="onClose">该功能开发中,敬请期待</van-popup> -->
  </view>
 
</scroll-view>
</template>

<script>
import {getStorageSync, getUserInformation, setStorageSync, getOpenId} from '../../api/wechat'
import {register} from '../../api/index'
import dialog from 'vant-weapp/dist/dialog/dialog'
import auth from '../../components/base/auth/auth'

export default {

  name: '',
  props: [''],
  data () {
    return {
      userInformation: {},
      Show: false,
      authLoginFlag: false,
      loginflag: false,
      showlog: true
    }
  },

  components: {auth},
  created () {},

  computed: {
  },

  beforeMount () {},
  onShow () {
    this.IsLogined()
  },

  onLoad () {
    this.IsLogined()
  },
  methods: {
    onClose () {
      this.showlog = false
    },
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
      this.$router.push('/pages/favor/main')
    },
    // 关注
    ToAttention () {
      this.$router.push('/pages/guanzhu/main')
    },
    ToHonner () {
      this.$router.push('/pages/honor/main')
    },
    showImage () {
      this.$router.push('/pages/donate/main')
    },
    changeColor () {
      dialog.alert({
        message: '该功能开发中'
      }).then(() => {})
    },
    getUserInfo () {
      this.getUInfo()
    },
    getUInfo () {
      getUserInformation((userInfo) => {
        setTimeout(() => {
          this.showlog = false
          this.userInformation = getStorageSync('usnerInfo')
          mpvue.lin.showToast({
            title: '登录成功',
            icon: 'success'
          })
        }, 50)
        setStorageSync('usnerInfo', userInfo)
        const openId = getStorageSync('openId')
        if (!openId || openId.length === 0) {
          getOpenId()
        } else {
          // 已获得openid的回调执行
          register(openId, userInfo)
        }
      },
      () => {
        console.log('failed')
      }
      )
    },
    IsLogined () {
      let login = false
      let userInfo = getStorageSync('openId')
      if (userInfo !== '') {
        login = false
      } else {
        login = true
      }
      this.showlog = login
      // console.log(this.showlog)
      this.userInformation = getStorageSync('usnerInfo')
    }
  }

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
