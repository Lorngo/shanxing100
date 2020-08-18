let app = new getApp()
import login from "../../../utils/api/login.js"
import tool from "../../../utils/publics/tool.js"
import api from "../../../utils/api/api.js"
Page({
  data: {
   baseurl:app.store.$state.ASSETSURL,
	 gradeList:['公益新秀','乐于助人','古道热肠','乐善好施','积善成德','仁者爱人','大爱无疆'],
   volunType:2,//判断是否是志愿者 1是  2不是
	 brightStar:[1,2],//亮的星星数
	 darkStar:[1],//暗的星星数
	 isMedal:true,//是否显示勋章弹窗
	 userInfo:{},//用户信息
   donateData:{}//捐赠信息
	},
  onLoad: function (options) {
		console.log(app.store.getState());
    this.setData({
			userInfo:wx.getStorageSync('userInfo').user_info
		})
  },
  onShow: function () {
		api.getUserInfo().then(res=>{
			console.log("用户信息获取",res);
			this.setData({
				donateData:res.data.data.user_info
			})
		})
  },
	//获取用户授权
	getInfo(e){
		if(e.detail.errMsg=="getUserInfo:ok")
		{
			login.authorize(e).then(res=>{
				console.log(res);
				if(res)
				{
					tool.alert('授权成功')
					this.setData({
						userInfo:wx.getStorageSync('userInfo')
					})
				}else{
					tool.alert('请重试')
				}
			})
		}
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