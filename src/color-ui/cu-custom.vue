<template>
  <view>
    <view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
      <view
        class="cu-bar fixed"
        :style="style"
        :class="[bgImage!=''?'none-bg text-white bg-img':'',bgcolor]"
      >
        <view class="action" @click="BackPage" v-if="isBack">
          <text class="cuIcon-back"></text>
          <slot name="backText"></slot>
        </view>
        <view class="content" :style="[{top:StatusBar + 'px'}]">
          <slot name="content"></slot>
        </view>
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar,
      style: {}
    }
  },
  name: 'cu-custom',
  mounted () {
    var StatusBar = this.StatusBar
    var CustomBar = this.CustomBar
    var bgImage = this.bgImage
    var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`
    if (this.bgImage) {
      style = `${style}background-image:url(${bgImage});`
    }
    this.style = style
  },
  props: {
    bgcolor: {
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
  methods: {
    BackPage () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.cu-custom .cu-bar .action .cuIcon-back {
  opacity: 1;
}
</style>
