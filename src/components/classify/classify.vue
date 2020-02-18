<template>
<div class="type">
<div class="homebook">
   <Homebook :row="category.length / 2" :col="2" :data="category" :showTitle="false" :showBtn="false" ></Homebook>
</div>  
<div class="loading" v-if="!category.length">
  <l-loading show="true" full-screen="true" size="large" type="change"></l-loading>
</div>
</div>
</template>

<script>
import Homebook from '../Home/Homebook'
import {getcatalogueList} from '../../api/index'
export default {
  name: '',
  props: [''],
  data () {
    return {
      category: []
    }
  },
  components: {Homebook},
  created () {},

  computed: {},

  beforeMount () {},

  onLoad () {
    getcatalogueList().then((res) => {
      this.category = res.data.data
    })
  },

  methods: {},

  watch: {}

}
</script>
<style lang='stylus' scoped>
.homebook
  margin-top 30px
</style>
