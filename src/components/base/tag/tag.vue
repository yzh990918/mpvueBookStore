<template>
  <div class="tag-wrapper" @click="selectTag">
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    data () {
      return {

      }
    },

    components: {},
    created () {},

    computed: {},

    beforeMount () {},

    mounted () {},

    methods: {
      selectTag () {
        this.$emit('SelectTag')
      }
    },

    watch: {}

  }
</script>
<style lang='stylus' scoped>
.tag-wrapper
  display inline-flex
  justify-content center
  max-width 320px
  padding 6px 17px
  background: #F7F7F9;
  border-radius: 40px;
  .text
    font-size: 14px
    color: #272E37
    width 100%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
</style>
