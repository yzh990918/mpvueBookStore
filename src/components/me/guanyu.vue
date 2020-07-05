<template>
<div class="about">
  <div class="header">
    <img class="background" src="https://cdn.nlark.com/yuque/0/2019/jpeg/280373/1551799188571-assets/web-upload/9d73921e-c4e4-4231-a07a-4caca0d26b64.jpeg" alt="">
    <img class="logo" src="https://i.loli.net/2020/02/17/qKnZz13REVmvP6x.png" alt="">
  </div>
    <view class="cu-bar justify-center bg-white">
    <view class="action sub-title">
      <text class="text-xl text-bold text-blue">简介</text>
      <text class="text-ABC text-blue">about</text>
      <!-- last-child选择器-->
    </view>
  </view>
  <view class='margin-xl bg-white padding-xl radius shadow-lg'>
  <view class='text-center margin-bottom text-lg  text-grey'>关于悦读ECUT</view>
  <view class='text-content'>
    <view>Hi！欢迎使用悦读ECUT！</view>
    <view class='margin-top-sm'>该项目是我(杨志豪)在20年1月份开发出来的一款书城小程序，它集成了vant-weapp color-ui lin-ui多个优秀的组件库 采用的是mpvue开发多端小程序框架(加部分原生小程API)开发的，由衷感谢这些ui框架和mpvue框架</view>
     <view class='margin-top-sm'>项目需要您绑定一下账号授权,不然书架和阅读功能可能无法使用</view>
    <view class='margin-top-sm'>小程序是免费的，不收取任何费用，如果这个书城有帮到你，或者你觉得很赞，可以在GitHub里扫描赞赏码支持一下！</view>
    <view class='margin-top-sm'>书城包含了首页,推荐,轮播,免费热读,热门更新,图书分类,图书搜索,图书列表,书架，播放音乐等功能</view>
    <view class='margin-top-sm'>合作微信:Ynulinulizainuli0918</view>
    <view class='margin-top-sm'>更多好玩的功能敬请期待！</view>
  </view>
</view>

</div>
   
</template>

<script>
  export default {
    name: '',
    props: [''],
    data () {
      return {

      }
    },

    components: {},
    created () {},

    computed: {},

    beforeMount () {},

    mounted () {},

    methods: {},

    watch: {}

  }
</script>
<style lang='stylus' scoped>
.about
  .header
    position: relative;
    width: 100%;
    height: 400rpx;
    text-align: center;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    .background
      position absolute
      top 0
      left 0
      right 0
      width 100%
      height 100%
      z-index 1
    .logo
      position relative
      width 80px
      height 80px
      border-radius 50%
      z-index 3
      opacity .9
</style>
