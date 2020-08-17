let app = new getApp()
Page({
  data: {
    baseurl:app.globalData.ASSETSURL,
		pronum:0,//加减的数量
		type:0,//1减 2加
		proIndex:-1,//操作的项目序号
		moneyIndex:1,
		flag:false,//是否同意
		isMoney:true,//是否显示金额选择弹窗,默认隐藏
		money:10//捐赠的金额
  },
  onLoad: function (res) {
   this.setData({
		 pronum:res.num
	 })
  },
  onShow: function () {

  },
	//同意协议
	goAgeen(){
		this.setData({
			flag:!this.data.flag
		})
	},
	//加减操作
	operaData(e){
		let types = e.currentTarget.dataset.types
		this.setData({
			type:types
		})
		//types=1 减 =2 加
		if(this.data.pronum>1&&types==1)
		{
			let num = this.data.pronum
			num-- 
			this.setData({
				pronum:num
			})
		}else if(types==2)
		{
			let num = this.data.pronum
			num++
			this.setData({
				pronum:num
			})
		}
	},
	//获取自定义的金额数
	getCustom(e){
	 let num = e.detail.value
	 this.setData({
		 moneyIndex:0,
		 money:num
	 })
	},
	//捐赠
	goDona(e){
		let type = e.currentTarget.dataset.type
		//type=1 捐赠弹窗显示  2  隐藏
		if(type==1)
		{
			this.setData({
				isMoney:false
			})
		}else
		{
			this.setData({
				isMoney:true
			})
		}
	},
	//选择金额
	chooseMon(e){
		let keys = e.currentTarget.dataset.key
		let nums = e.currentTarget.dataset.nums
		this.setData({
			moneyIndex:keys,
			money:nums
		})
	},
	//确认捐赠
	goPay(){
		if(this.data.money=='')
		{
			wx.showToast({
				title:'还未选择捐赠的金额噢',
				icon:'none'
			})
			return
		}else if(!this.data.flag)
		{
			wx.showToast({
				title:'请同意并勾选协议',
				icon:'none'
			})
			return
		}
	}
})