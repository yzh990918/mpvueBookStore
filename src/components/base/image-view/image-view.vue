<template>
<div class="image-view" @click="onClick">
  <img
    :class="round ? ' round image' : 'image'"
    :style="{ height }"
    :src="src"
    :mode="mode"
    :lazy-load="lazyLoad"
    @error="onError"
    @load="onLoad"
    v-show="!isLoading"
  >
  <img
    :class="round ? ' round image' : 'image'"
    :style="{ height }"
    src="../../../../static/images/user.png"
    :mode="mode"
    @error="onPreloadError"
    @load="onPreload"
    v-show="isLoading || error"
    v-if="mpvuePlatform === 'wx'"
  >
</div>
</template>

<script>
  export default {
    props: {
      src: {
        type: String,
        default: ''
      },
      mode: {
        type: String,
        default: 'widthFix'
      },
      lazyLoad: {
        type: Boolean,
        default: true
      },
      round: {
        type: Boolean,
        default: false
      },
      height: {
        type: String,
        default: 'auto'
      }
    },
    watch: {
      src (value, preValue) {
        if (value && value.length > 0 && value !== preValue) {
          this.$nextTick(() => {
            this.isLoading = true
          })
        }
      }
    },
    data () {
      return {
        isLoading: true, // 实际图片读取状态
        error: false // 图片加载失败是否
      }
    },
    methods: {
      onClick () {
        this.$emit('onClick')
      },
      onError () {
        this.error = true
      },
      onLoad () {
        this.isLoading = false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .image-view 
    width: 100%;
    height: 100%;
    .round 
      border-radius: 50%;
    .image 
      width: 100%; 
</style>
