<template>
	<view class="content">
		<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="false">
			<block slot="backText">返回</block>
		</cu-custom>
		<view class="title-main">出入库管家</view>
		<view class="cu-form-group">
			<view class="title">选择企业</view>
			<picker @change="pickerChange" :value="index" :range="picker">
				<view class="picker">
					{{index>-1?picker[index]:'禁止换行，超出容器部分会以 ... 方式截断'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号码</view>
			<input type="number" ref="phone" placeholder="请输入手机号" name="input" maxlength="11" v-model="phone"></input>
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
			<view class="title">密码</view>
			<input ref="password" maxlength="18" placeholder="请输入密码" name="input" password="true" v-model="password"></input>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">管理员登录</view>
			<switch @change="switchChange" :class="isAdmin?'checked':''" :checked="isAdmin?true:false"></switch>
		</view>
		<view class="box">
			<view class="cu-bar btn-group">
				<button class="cu-btn bg-green shadow-blur round lg" @click="login">登录</button>
			</view>
		</view>
		<!-- 这个color ui 自带的alert不好用，很丑-->
		<view class="cu-load load-modal" v-if="false">
			<view class="gray-text">登录中...</view>
		</view>
		<!-- <button @click="open">打开弹窗</button> -->
		<tui-toast ref="toast"></tui-toast>



	</view>

</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				picker: ['伯亨家具', '测试企业'],
				showAlert: true,
				phone: '17322309201',
				password: '123456',
				isAdmin: false,
			}
		},
		methods: {
			login() {
				console.log("请求登录 ,phone", this.phone, "password", this.password)
				let params = {
					title: "操作成功",
					imgUrl: "/static/images/toast/check-circle.png",
					icon: false
				};
				if (!this.phone) {
					params.title = '请输入手机号'
					return this.$refs.toast.show(params)
				} else if (!this.password) {
					params.title = '请输入密码'
					return this.$refs.toast.show(params)
				}

				// this.showAlert = true
				uni.showLoading({
					title: '登录中……'
				});
				uniCloud.callFunction({
					name: 'user',
					data: {
						method: 'login',
						phone: this.phone,
						username: '八八',
						password: this.password,
						company: this.picker[this.index],
						isAdmin: this.isAdmin, //是否是管理员的角色
					}
				}).then((res) => {
					uni.hideLoading();
					console.log("返回结果", res.result)
					if (res.result.code == 1) { //登录成功
						uni.showToast({
							title: res.result.msg,
							duration: 1000
						})
						console.log("是否作为管理员登录：", this.isAdmin)
						if (!this.isAdmin) {
							uni.redirectTo({
								url: '/pages/main/main',
							})
						} else {
							uni.navigateTo({
								url: '/pages/admin/admin',
							})
						}
					} else {
						params.title = res.result.msg
						params.icon = false;
						this.$refs.toast.show(params)
					}
				}).catch((err) => {
					this.showAlert = false
					console.error(err)
				})
			},
			open() {
				this.showAlert = true
			},
			pickerChange: function(event) {
				console.log('picker发送选择改变，携带值为', event.target.value)
				this.index = event.target.value

			},
			switchChange: function(event) {
				this.isAdmin = event.target.value
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
