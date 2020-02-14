<template>
  <div class="about">
    <div class="bg-a">
   <img src="https://cdn.nlark.com/yuque/0/2019/jpeg/280373/1553234997376-assets/web-upload/88695068-5581-4eb1-a8b0-55276904b34f.jpeg" 
   mode="aspectFill"
   alt="">
    </div>
    <div class="info">
    <div class="avatar">
        <van-image width="50" fit="cover" height="50" round src="https://i.loli.net/2020/02/14/DYUQ3lbxtOIeV19.jpg"></van-image>
    <div class="title text-blue">
      东理悦读 V1.0.1
    </div>
    </div>
    <div class="desc">
      <div class="desc-t">
        Hi! 你好呀,欢饮使用东理悦读
      </div>
      <div class="desc-m">
        <div class="desc1">该项目始于20年一月份</div>
        <div class="desc2">基于mpvue lin-ui vant-weapp color-ui</div>
        <div class="desc3">
          是一款高颜值的书城小程序
        </div>
      </div>
      <div class="desc-b">
        <h2 class="desc-4">
        书城小程序不收取任何费用
        </h2>
        <h2 class="desc-5">
          希望该小程序能够在你闲暇时分
        </h2>
        <h2 class="desc-6">
          帮助你陶冶情操 查询资料
        </h2>
         <h2 class="desc-7">
          书籍是人类进步的阶梯
        </h2>
      </div>
    </div>
    </div>
   
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
  padding 40px 0 20px 20px
.bg-a
  position fixed
  z-index 1
  width 100%
  height 100%
  top 0 
  bottom 0
  left 0
  right 0
.info
  z-index 4
  display flex
  flex-direction column
  .avatar
    display flex
    flex-direction column
    .title
      margin-top 15px
      font-size 20px
      line-height 25px
      text-shadow: 0 0 3px rgba(0, 0, 0, 0.3)

</style>
