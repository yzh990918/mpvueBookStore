<template>
  <div class="suggest">
    <searchItem 
    icon="order"
    :title="category"
    sub-title="category"
    @selectItem="showList(category,'cate')"
    v-if="category"
    ></searchItem>
    <searchItem
    icon="user"
    :title="author"
    sub-title="author"
    @selectItem="showList(author,'author')"
    v-if="author"
    ></searchItem>
    <searchItem
    icon="address"
    :title="publisher"
    sub-title="publisher"
    @selectItem="showList(publisher,'publisher')"
    v-if="publisher"
    ></searchItem>
    <div class="list-wrapper">
    <searchList
    :data="list"
    @selectBook="showBook"
    v-if='list'
    ></searchList>
    </div>
  </div>
</template>

<script>
import searchItem from '../Search/searchitem'
import searchList from '../Search/searchlist'
export default {
  name: '',
  props: {
    data: Object
  },
  data () {
    return {

    }
  },

  components: {searchItem, searchList},
  created () {},

  computed: {
    category () {
      if (this.data && this.data.category && this.data.category.length > 0) {
        return this.data.category[0].categoryText
      } else {
        return null
      }
    },
    author () {
      if (this.data && this.data.author && this.data.author.length > 0) {
        return this.data.author[0].author
      } else {
        return null
      }
    },
    publisher () {
      if (this.data && this.data.publisher && this.data.publisher.length > 0) {
        return this.data.publisher[0].publisher
      } else {
        return null
      }
    },
    list () {
      if (this.data && this.data.book && this.data.book.length > 0) {
        return this.data.book
      } else {
        return null
      }
    }

  },

  beforeMount () {},

  mounted () {},

  methods: {
    showList (item, key) {
      console.log(item, key)
    },
    showBook (book) {
      console.log(book)
    }
  },

  watch: {}

}
</script>
<style lang='stylus' scoped>
.suggest
  .list-wrapper
    margin-top -35px
</style>
