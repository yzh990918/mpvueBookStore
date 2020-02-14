<template>
<div>
<about></about>
</div>
</template>

<script>
import {getStorageSync} from '../../api/wechat'
import about from '../../components/me/about'
export default {
  name: '',
  props: [''],
  data () {
    return {
      userInfo: []

    }
  },
  components: {about},
  created () {},

  computed: {},

  beforeMount () {},

  mounted () {
    this.userInfo = getStorageSync('usnerInfo')
  },

  methods: {},

  watch: {}

}
</script>
<style lang="stylus" scoped>
</style>
