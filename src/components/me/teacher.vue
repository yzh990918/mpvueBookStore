<template>
  <div>
    <form action="">
      <view class="cu-bar justify-center bg-white">
        <view class="action border-title">
          <text class="text-xl text-bold">用户信息</text>
          <text class="bg-grey" style="width:2rem"></text>
          <!-- 底部样式 last-child选择器-->
        </view>
      </view>
      	<view class="cu-form-group">
				<view class="title">教师姓名</view>
				<input placeholder="请输入姓名" name="input"/>
				<text class='cuIcon-addressbook text-blue'></text>
			</view>
      	<view class="cu-form-group">
				<view class="title">邮箱</view>
				<input placeholder="请输入邮箱" name="input"/>
				<text class='cuIcon-form text-blue'></text>
			</view>
      	<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="请输入手机号码" name="input"/>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
      	<view class="cu-form-group">
				<view class="title">选择学院</view>
				<picker @change="PickerChange" :value="index" :range="picker1">
					<view class="picker">
						{{index>-1?picker1[index]:'添加的学院会动态提交到服务器'}}
					</view>
				</picker>
			</view>
      	<view class="cu-form-group">
				<view class="title">选择班级</view>
				<picker @change="PickerChange2" :value="index2" :range="picker2">
					<view class="picker">
						{{index2>-1?picker2[index2]:'选择班级后关联更佳'}}
					</view>
				</picker>
			</view>
      <view class="cu-bar justify-center bg-white margin-top">
    <view class="action border-title">
      <text class="text-xl text-bold">添加图书</text>
      <text class="bg-grey" style="width:2rem"></text>
      <!-- 底部样式 last-child选择器-->
    </view>
  </view>
      <div class="book-info ">
      	<view class="cu-form-group">
				<view class="title">书籍名称</view>
				<input placeholder="请输入姓名" name="input"/>
				<text class='cuIcon-read text-blue'></text>
			</view>
      		<view class="cu-form-group">
				<view class="title">作者</view>
				<input placeholder="请输入姓名" name="input"/>
				<text class='cuIcon-peoplefill text-blue'></text>
			</view>
      	<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="请输入书籍简介"></textarea>
			</view>
      <span class="text-gray margin-top" style="padding-left:10px;font-size:13px">上传文件</span>
      <div class="file-wrapper bg-white">
        <l-image-picker count="3" @linchange="onChangeTap" />
      </div>
      </div>
    </form>
     <div class="button-wrapper">
        <l-button @click="submit">提交</l-button>
        </div>
        <l-message content="content"></l-message>
  </div>
</template>

<script>
  export default {
    name: '',
    props: [''],
    data () {
      return {
        index: -1,
        index2: -1,
        picker1: ['软件学院', '信工学院', '理学院', '化生材学院', '机械学院', '材料学院', '体育学院'],
        picker2: ['1721801', '1721802', '1721803', '1721804', '1721805'],
        modalName: null
      }
    },

    components: {},
    created () {},

    computed: {},

    beforeMount () {},

    mounted () {},

    methods: {
      PickerChange (e) {
        this.index = e.mp.detail.value
      },
      PickerChange2 (e) {
        this.index2 = e.mp.detail.value
      },
      textareaAInput (e) {
        this.textareaAValue = e.mp.detail.value
      },
      submit () {
        mpvue.lin.showMessage({
          content: '暂时未开放',
          duration: 3000
        })
      }
    },

    watch: {}

  }
</script>
<style lang='stylus' scoped>
.button-wrapper
  padding-left 10px
  margin-top 10px
</style>
