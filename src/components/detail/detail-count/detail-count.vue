<template>
  <div class="detail-count">
    <div class="book-info">
      <div class="left">
        <div class="stars-score">
          <div class="score">{{rankAvg}}</div>
          <div class="rate">
            <van-rate
              :value="rankAvg"
              :size="16"
              color="#e74c3c"
              void-color="#DEE0E2"
              void-icon="star"
              readonly="true"
            ></van-rate>
          </div>
        </div>
        <div class="components">
          {{rankNum}}人点评
        </div>
      </div>
      <div class="right">
        <div class="readBook-count">
          <span class="count">{{readerNum}}</span><span class="text">人在此读书</span>
        </div>
        <div class="avatar-group">
          <div
            class="readers-avatar"
            v-for="(item, index) in reader"
            :key="index"
          >
            <van-image
              round
              lazy-load
              width="20"
              height="20"
              fit="cover"
              :src="item.avatarUrl"
            ></van-image>
          </div>
        </div>
      </div>
    </div>
    <div class="touch-rate">
      <div class="title">轻点评分</div>
      <div class="rate-wrapper">
        <van-rate
          :value="rateValue"
          :size="25"
          color="#1D89EE"
          void-color="#DEE0E2"
          void-icon="star"
          @change="onRateChange"
        ></van-rate>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    reader: {
      type: Array
    },
    readerNum: {
      type: Number,
      default: 0
    },
    rankNum: {
      type: Number,
      default: 0
    },
    rankAvg: {
      type: Number,
      default: 0
    },
    rateValue: {
      type: Number
    }
  },
  data () {
    return {}
  },

  components: {},
  created () {},

  computed: {},

  beforeMount () {},

  mounted () {
    console.log(this.reader)
  },

  methods: {
    onRateChange (e) {
      this.$emit('rate', e.mp.detail)
    }
  },

  watch: {}
}
</script>
<style lang="stylus" scoped>
.detail-count
  margin 14.5px 20px 0 21.5px
  .book-info
    display flex
    justify-content space-between
    .left
      display flex
      flex-direction column
      .stars-score
        display flex
        .score
          font-size: 24px
          color: #5E5E5E
          line-height 33.5px
        .rate
          flex 1
          display flex
          align-items center
          margin-left 9px
      .components
        margin-top 11px
        font-size: 11px
        color: #99A0AA
        line-height: 14px
    .right
      display flex
      flex-direction column
      padding-left 40px
      .readBook-count
        display flex 
        .text
          font-size: 11px
          color: #99A0AA
          line-height: 14px
          display inline-flex
          margin-top 9px
          margin-left 3px
        .count
          font-size 24px
          color #5E5E5E
          line-height 33.5px
      .avatar-group
        margin-top 6px
        display flex
        max-width 162px
        overflow hidden
        flex-flow row nowrap
        .readers-avatar
          width 20px
          height 20px
  .touch-rate
    display flex
    justify-content space-between
    margin-top 4px
    .title
      font-size: 12px
      color: #99A0AA
      line-height: 14px
      margin-top 13px
</style>
