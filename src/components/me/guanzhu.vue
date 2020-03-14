<template>
  <div>
   	<div class="cu-list menu-avatar">
				<div class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in mockdata" :key="index"
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
					<div class="cu-avatar round lg" :style="[{backgroundImage:'url('+ (item.avatar) +')'}]"></div>
					<div class="content">
						<div class="text-grey">{{item.name}}</div>
						<div class="text-gray text-sm">
							<text class="cuIcon-profile text-blue  margin-right-xs"></text> {{item.info}}</div>
					</div>
					<div class="action">
						<div class="text-grey text-xs">星期四</div>
					</div>
					<div class="move">
						<div class="bg-grey item">私聊</div>
						<div class="bg-red item">删除</div>
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
        skin: false,
        modalName: null,
        listTouchStart: 0,
        listTouchDirection: null,
        mockdata: [
          {
            id: 1,
            name: '杨志豪',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
            info: '软件学院大三学生'
          },
          {
            id: 1,
            name: '徐固',
            avatar: 'https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg?imageView2/1/w/80/h/80',
            info: '软件学院大三学生'
          },
          {
            id: 1,
            name: '刘程伟',
            avatar: 'https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg?imageView2/1/w/80/h/80',
            info: '软件学院大三学生'
          },
          {
            id: 1,
            name: '杨志豪',
            avatar: 'https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg?imageView2/1/w/80/h/80',
            info: '软件学院大三学生'
          },
          {
            id: 1,
            name: '徐固',
            avatar: 'https://wpimg.wallstcn.com/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imageView2/1/w/80/h/80',
            info: '软件学院大三学生'
          },
          {
            id: 1,
            name: '刘程伟',
            avatar: 'https://wpimg.wallstcn.com/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imageView2/1/w/80/h/80',
            info: '软件学院大三学生'
          },
          {
            id: 1,
            name: '杨志豪',
            avatar: 'https://wpimg.wallstcn.com/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imageView2/1/w/80/h/80',
            info: '软件学院大三学生'
          },
          {
            id: 1,
            name: '徐固',
            avatar: 'https://wpimg.wallstcn.com/fb57f689-e1ab-443c-af12-8d4066e202e2.jpg?imageView2/1/w/80/h/80',
            info: '软件学院大三学生'
          },
          {
            id: 1,
            name: '刘程伟',
            avatar: 'https://wpimg.wallstcn.com/fb57f689-e1ab-443c-af12-8d4066e202e2.jpg?imageView2/1/w/80/h/80',
            info: '软件学院大三学生'
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

      ListTouchStart (e) {
        this.listTouchStart = e.touches[0].pageX
      },

      // ListTouch计算方向
      ListTouchMove (e) {
        this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
      },

      // ListTouch计算滚动
      ListTouchEnd (e) {
        if (this.listTouchDirection === 'left') {
          this.modalName = e.currentTarget.dataset.target
        } else {
          this.modalName = null
        }
        this.listTouchDirection = null
      }
    },

    watch: {}

  }
</script>
<style lang='stylus' scoped>

</style>

<style >
  	.page {
		height: 100Vh;
		width: 100vw;
	}
  .item{
    flex:0 0 50%;
    line-height:77px;
    text-align: center;
    height:77px;
  }
</style>
