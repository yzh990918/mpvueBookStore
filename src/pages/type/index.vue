<template>
<div class="type">
    <Homebook :row="category.length / 2" :col="2" :data="category" :showTitle="false" :showBtn="false" ></Homebook>
</div>
</template>

<script>
import Homebook from '../../components/Home/Homebook'
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

  mounted () {
    getcatalogueList().then((res) => {
      this.category = res.data.data
    })
  },

  methods: {},

  watch: {}

}
</script>
<style lang='stylus' scoped>

</style>
