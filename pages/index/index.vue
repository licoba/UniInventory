<template>
	<view class="content">
		<view class="title-main">出入库管家</view>
		<view class=".cu-form-group">
			<view class="title">选择企业</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{index>-1?picker[index]:'禁止换行，超出容器部分会以 ... 方式截断'}}
				</view>
			</picker>
		</view>

		<view class=".cu-form-group">
			<view class="title">手机号码</view>
			<input placeholder="请输入手机号" name="input" maxlength="11"></input>
			<view class="cu-capsule radius">
				<view class='cu-tag bg-blue '>
					+86
				</view>
				<view class="cu-tag line-blue">
					中国大陆
				</view>
			</view>
		</view>

		<view class=".cu-form-group">
			<view class="title">密码</view>
			<input placeholder="请输入密码" name="input" password="true"></input>
		</view>

		<view class="box">
			<view class="cu-bar btn-group">
				<button class="cu-btn bg-green shadow-blur round lg" @click="login">登录</button>
			</view>
		</view>
		
		<view class="cu-load load-modal" v-if="showLoginModal">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<!-- <image src="/static/logo.png" mode="aspectFit"></image> -->
			<view class="gray-text">登录中...</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				picker: ['伯亨家具', '测试企业'],
				showLoginModal: false,
			}
		},
		methods: {
			login() {
				console.log("请求登录接口")
				this.showLoginModal = true
				uniCloud.callFunction({
					name: 'login',
					data: {
						phone: '17322309201',
						username: '八八',
						password: '123456',
						company:'伯亨家具'
					}
				}).then((res) => {
					this.showLoginModal = false
					console.log(res)
				}).catch((err) => {
					this.showLoginModal = false
					console.error(err)
				})
			}
			
		}
	}
</script>

<style>
	.content {
		padding-bottom: 30px;
	}

	.title-main {
		font-weight: bold;
		text-align: center;
		padding: 20px 0px;
		font-size: 20px;
	}

	.tips {
		color: #999999;
		font-size: 14px;
		padding: 20px 30px;
	}

	.btn-list {
		padding: 0px 30px;
	}

	.btn-list button {
		margin-bottom: 20px;
	}

	.upload-preview {
		width: 100%;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.box {
		margin: 20upx 0;
	}
</style>
