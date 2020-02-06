<template>
  <div>
    <searchBox></searchBox>
    <Homecard></Homecard>
    <Homebanner></Homebanner>
  </div>
</template>
<script>
import searchBox from '../../components/base/search-box/search-box'
import Homecard from '../../components/Home/Homecard'
import Homebanner from '../../components/Home/Homebanner'

export default {
  name: '',
  props: [''],
  data () {
    return {

    }
  },
  components: {searchBox, Homecard, Homebanner},
  created () {},

  computed: {},

  beforeMount () {},

  mounted () {},

  methods: {
  },

  watch: {}

}
</script>
<style lang='stylus' scoped>

</style>
