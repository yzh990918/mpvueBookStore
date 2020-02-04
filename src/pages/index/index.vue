<template>
  <div>
    <van-button type="primary">按钮</van-button>
    <div>
      按钮:
  <l-button type="success" size="large">default</l-button>
    </div>
      <div>
      图标:
  <l-icon name="eye"></l-icon>
    </div>
    列表:
  <l-list gap=20 title="购物车" icon="cart" tag-content="购物车" />
  <l-list title="购物车" icon="cart" tag-content="购物车" tag-color="#F4516c"/>
  <l-list title="消息" icon="notification" tag-content="消息" tag-position="right"/>
  <l-list title="消息" icon="notification" tag-content="消息" tagShape="circle" tag-position="right"/>
    <div>
    <div>
      
    </div>

    </div>
  
  </div>
</template>

<script>
  export default {
    name: '',
    props: [''],
    data () {
      return {

      }
    },
    components: {},
    created () {},

    computed: {},

    beforeMount () {},

    mounted () {},

    methods: {},

    watch: {}

  }
</script>
<style lang='stylus' scoped>

</style>
