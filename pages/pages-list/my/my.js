let app = new getApp()
Page({
  data: {
   baseurl:app.globalData.ASSETSURL,
	 gradeList:['公益新秀','乐于助人','古道热肠','乐善好施','积善成德','仁者爱人','大爱无疆'],
   volunType:2,//判断是否是志愿者 1是  2不是
	 brightStar:[1,2],//亮的星星数
	 darkStar:[1],
	 isMedal:true
	},
  onLoad: function (options) {

  },
  onShow: function () {

  },
	//页面跳转
	goPages(e){
		let url = e.currentTarget.dataset.url
		if(url==1)
		{
			url = "../volunt-info/volunt-info"
		}else if(url==2)
		{
			url = "../signup/signup"
		}
		wx.navigateTo({
			url:url
		})
	},
	//查看勋章获取条件
	lookMedal(){
		this.setData({
			isMedal:false
		})
	},
	//关闭勋章弹窗
	closeModel(){
		this.setData({
			isMedal:true
		})
	}
})