let app = new getApp()
Page({
	data: {
		baseurl: app.store.$state.ASSETSURL,
		isCall:false//联系我们的弹窗,默认关闭
	},

	onLoad: function(options) {

	},

	onShow: function() {

	},
	//联系我们
	goCall(){
		this.setData({
			isCall:true
		})
	},
	//关闭联系我们的弹窗
	closePhone(){
		this.setData({
			isCall:false
		})
	},
	//打电话
	goCallphone(){
		wx.makePhoneCall({
			phoneNumber:'15973163746'
		})
	},
	//页面跳转
	goPage(e){
		let url = e.currentTarget.dataset.url
		wx.navigateTo({
			url:url
		})
	}
})
