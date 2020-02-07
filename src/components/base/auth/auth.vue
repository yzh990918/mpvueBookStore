<template>
  <div class="auth">
    <div class="dialog">
      <div class="info">
        <div class="image-wrapper">
          <imageview src="https://i.loli.net/2020/02/07/6TiVX1GcpwE8tJv.jpg" round></imageview>
        </div>
        <div class="sub-title">登陆东理悦读</div>
        <div class="desc">更多好书等你阅读</div>
      </div>
      <button class="login-button"
     @getuserinfo="getUserInfo"
      open-type="getUserInfo"
      >授权登录</button>
    </div>
    
  </div>
</template>

<script>
import imageview from '../../base/image-view/image-view'
export default {
  name: '',
  props: [''],
  data () {
    return {

    }
  },

  components: {imageview},
  created () {},

  computed: {},

  beforeMount () {},

  mounted () {},

  methods: {
    getUserInfo () {
      this.$emit('getUserInfo')
    }
  },

  watch: {}

}
</script>
<style lang='stylus' scoped>
.auth
  position fixed
  left 0
  top 0
  width 100%
  height 100%
  background #999999
  display flex
  align-items center
  justify-content center
  z-index 1000
  .dialog
    width 270px
    height 248px
    border-radius 18px
    position relative
    background #F5F5F5
    .info
      display flex
      flex-direction column
      align-items center
      justify-content center
      .image-wrapper
        width 74px
        height 74px
        margin-top 22.5px
      .sub-title
        margin-top 18px
        font-size 13px
        color #999999
        line-height 18.5px
      .desc
        margin-top 3.5px
        font-size 16px
        font-weight 500
        color #333333
    .login-button
      position absolute
      bottom 0
      width 100%
      background-image: linear-gradient(90deg, #1EA3F5 0%, #0F87FC 100%);
      border-radius: 0 0 18px 18px;

</style>
