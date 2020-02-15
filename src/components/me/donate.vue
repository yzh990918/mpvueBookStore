<template>
  <div>
<view class='paycode'>
  <image src='https://i.loli.net/2020/02/15/YKmowvrqgLXk7cS.jpg' class='codeimg' @click="previewImage"></image>
  <view class='textview'>
    <text class='text'>点击图片后长按识别赞赏码</text>
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
        imgList: ['https://i.loli.net/2020/02/15/YKmowvrqgLXk7cS.jpg']

      }
    },
    components: {},
    created () {},

    computed: {},

    beforeMount () {},

    mounted () {},
  
    methods: {
      previewImage: function () {
        mpvue.previewImage({
          urls: this.imgList
        })
      }
    },

    watch: {}

  }
</script>
<style scoped>
.paycode{
  text-align: center;
}
.codeimg{
  width: 593rpx;
  height: 690rpx;  
}
.codeimg:active {
  opacity: .8;
}
.text{
  font-size: 40rpx;
}
.textview{
  margin-top: 32rpx;
}
</style>
