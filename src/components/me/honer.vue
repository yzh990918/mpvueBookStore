<template>
  <div class="honer">
<div class="cu-bar justify-center bg-white">
    <div class="action sub-title">
      <text class="text-xl text-bold text-green">开发贡献</text>
      <text class="bg-green" style="width:2rem"></text>
      <!-- last-child选择器-->
      </div>
  </div>
  <div class="about">
  <div class="team-wrapper">
    <div class="item" v-for="(item,index) in teamdata" :key="index">
      <div class="top shadow bg-white" >
        <div class="img-wrapper shadow ">
          <van-image round :src="item.avatar" lazy-load width="90" height="90" cover="fit"></van-image>
        </div>
        <div class="info">
          <div class="name text-black">{{item.name}}</div>
          <div class="sub-title text-gray">{{item.info}}</div>
        </div>
      </div>
      <div  class="desc bg-blue text-content">{{item.desc}}</div>
    </div>

  </div>
  </div>
  <div class="cu-bar justify-center bg-white">
    <div class="action sub-title">
      <text class="text-xl text-bold text-blue">荣誉区</text>
      <text class="bg-blue" style="width:2rem"></text>
      <!-- last-child选择器-->
      </div>
       </div>
  <div class="content">
      <van-collapse :value="activeName" @change="onChange" accordion>
      <van-collapse-item title="努力努力再努力" name="1">
       <van-image src="https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg?imageView2/2/h/440" cover="fit" width ="375" height="120"></van-image>
      </van-collapse-item>
      <van-collapse-item title="努力努力再努力" name="2">
        <van-image src="https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg?imageView2/2/h/440" cover="fit" width ="375" height="120"></van-image>
      </van-collapse-item>
      <van-collapse-item title="努力努力再努力" name="3">
        <van-image src="https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg?imageView2/2/h/440" cover="fit" width ="375" height="120"></van-image>
      </van-collapse-item>
    </van-collapse>
  </div>
  </div>
</template>

<script>
  export default {
    name: '',
    props: [''],
    data () {
      return {
        activeName: '1',
        teamdata: [
          {
            id: 1,
            name: '杨志豪',
            avatar: 'https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg?imageView2/1/w/80/h/80',
            info: '软件学院大三学生',
            desc: '本科就读于东华理工大学(尚未毕业),擅长前端开发,熟练掌握html5,css3,js,vue全家桶,pc，小程序APP多端开发，热衷于编写更好地代码展现app的魅力,是本项目的主要开发者和负责人.'
          },
          {
            id: 1,
            name: '徐固',
            avatar: 'https://wpimg.wallstcn.com/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imageView2/1/w/80/h/80',
            info: '软件学院大三学生',
            desc: '本科就读于东华理工大学(尚未毕业),擅长后端接口权限开发,熟练掌握java,springboot，springMvc，restfulAPi开发,熟练使用数据库交互和部署后端服务,是本项目的主要后端开发者.'
          },
          {
            id: 1,
            name: '刘程伟',
            avatar: 'https://wpimg.wallstcn.com/fb57f689-e1ab-443c-af12-8d4066e202e2.jpg?imageView2/1/w/80/h/80',
            info: '软件学院大三学生',
            desc: '本科就读于东华理工大学(尚未毕业,正在努力考研),擅长创新能力,对设计图，交互很熟练，本项目的部分灵感来源于此，正在努力备考考研中，是本项目的主要开发人员。'
          }
        ]

      }
    },

    components: {},
    created () {},

    computed: {},

    beforeMount () {},

    mounted () {},

    methods: {
      onChange (e) {
        this.activeName = e.mp.detail
      }
    },

    watch: {}

  }
</script>
<style lang='stylus' scoped>
.about
  padding 10px
  .team-wrapper
    display flex
    flex-direction column
    .item
      margin-top 23px
      display flex
      flex-direction column
      .top
        display flex
        .img-wrapper
          flex 0 0 90px
          border-radius 50%
          margin-top -8px
          width 90px
          height 90px
          box-shadow:0 30rpx 20rpx rgba(0, 0, 0, 0.2);
        .info
          flex 1
          display flex
          flex-direction column
          height 100px
          justify-content center
          padding-left 20px
          background rgba(255,255,255,.4)
          .name
            font-size 16px
            font-weight 500
            margin-bottom 8px
            line-height 20px
          .sub-title
            font-size 12px
            line-height 16px
      .desc
        margin-top -4px
        padding 25px
        font-size 15px
        line-height 26px
        min-height 120px
        height auto
        position relative
        &:before
          content:""
          position absolute
          left 10px
          top 15%
          width 5px
          background rgba(0,0,0,.3)
          opacity .7
          height 70%
.content
  margin-left 10px
  margin-right 10px
  margin-top 20px

</style>
