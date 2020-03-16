<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" >
				<view class="action" :style="[{marginTop:StatusBar + 'px'}]" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<!-- <view class="contentX" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view> -->
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	  data () {
	    return {
	      StatusBar: '',
      CustomBar: '',
      Custom: ''
	    }
	  },
	  name: 'cu-custom',
	  computed: {
	    style () {
	      var CustomBar = this.CustomBar
	      var bgImage = this.bgImage
	      var style = `height:${CustomBar}px;`
	      if (this.bgImage) {
	        style = `${style}background-image:url(${bgImage});`
	      }
	      return style
	    }
	  },
	  props: {
	    bgColor: {
	      type: String,
	      default: ''
	    },
	    isBack: {
	      type: [Boolean, String],
	      default: false
	    },
	    bgImage: {
	      type: String,
	      default: ''
	    }
  },
  mounted () {
    mpvue.getSystemInfo({ success: e => {
      let custom = mpvue.getMenuButtonBoundingClientRect()
      this.StatusBar = e.statusBarHeight
      this.CustomBar = custom.bottom + custom.top - e.statusBarHeight
      this.Custom = custom
    }})
  },
	  methods: {
	    BackPage () {
	      mpvue.navigateBack({
	        delta: 1
	      })
	    }
	  }
}
</script>

<style>
.contentX{
position: absolute;
text-align: center;
width: calc(100% - 340rpx);
left: -25%;
right: 0;
bottom: 0;
top: 0;
margin: auto;
height: 60rpx;
font-size: 32rpx;
line-height: 60rpx;
cursor: none;
pointer-events: none;
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;

}
.cu-custom ,.cu-bar{
  background-color:none!important;
} 
</style>
