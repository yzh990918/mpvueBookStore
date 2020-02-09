<template>
  <div class="search-list">
    <div class="search-list-wrapper">
      <div class="search-table" 
      v-for="(item,index) in data" 
      :key="index"
       @click="selectbook(item)"
      >
        <div class="image-wrapper">
          <imageView :src="item.cover"></imageView>
        </div>
        <div class="book-desc">
          <div class="title">{{item.title}}</div>
          <div class="author">{{item.author}}</div>
          <div class="cate">{{item.categoryText}}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import imageView from '../base/image-view/image-view'
export default {
  name: '',
  props: {
    data: {type: Array}
  },
  data () {
    return {

    }
  },

  components: {imageView},
  created () {},

  computed: {},

  beforeMount () {},

  mounted () {},

  methods: {
    selectbook (item) {
      this.$emit('selectBook', item)
    }
  },

  watch: {}

}
</script>
<style lang='stylus' scoped>
.search-list
  .search-list-wrapper
    padding 16px
    .search-table
      display flex
      margin-top 28.5px
      .image-wrapper
        width 47px
        height 68.5px
        margin-right 15.5px
      .book-desc
        display flex
        vertical-align top
        flex-direction column
        .title
          font-size 16px
          color #333333
          line-height 26px
          max-width 240px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .author
          font-size 13px
          margin-top 4px
          max-width 200px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          color rgba(0,0,0,.65)
          line-height 18px
        .cate
          font-size 13px
          margin-top 2px
          color rgba(0,0,0,0.45)
          line-height 18px
          
          



</style>
