<template>
  <div class="tag-group">
    <div class="tag-group-header">
      <div class="left-title">{{title}}</div>
      <div class="right-title" @click="onBtnClick">{{btnText}}</div>
    </div>
    <div class="tag-group-wrapper">
      <div class="tag-item" v-for="(item,index) in value" :key="index">
        <tag v-if="item.title" @SelectTag="onTagClick(item.fileName)" :text="item.title"></tag>
         <tag v-if="!item.title" @SelectTag="onHistoryTagClick(item)" :text="item"></tag>
      </div>
    </div>
  </div>
</template>

<script>
import tag from '../base/tag/tag'
export default {
  name: '',
  props: {
    title: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: ''
    },
    value: {
      type: Object
    }
  },
  data () {
    return {

    }
  },

  components: {tag},
  created () {},

  computed: {},

  beforeMount () {},

  mounted () {},

  methods: {
    onTagClick (item) {
      this.$emit('Tobookdetail', item)
    },
    onHistoryTagClick (item) {
      this.$emit('addinput', item)
    },
    onBtnClick () {
      this.$emit('_handle')
    }
  },

  watch: {}

}
</script>
<style lang='stylus' scoped>
.tag-group
  .tag-group-header
    padding 0 16px
    display flex
    justify-content space-between
    .left-title
      font-size: 16px;
      color: #333333;
      line-height 20px
    .right-title
      font-size 14px
      color: #3696EF
      line-height 20px
  .tag-group-wrapper
    padding 10px
    display flex
    flex-flow row wrap
    .tag-item
      padding 6px
</style>
