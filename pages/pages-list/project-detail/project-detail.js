let app = new getApp()
import api from '../../../utils/api/api'
import tool from '../../../utils/publics/tool.js'
Page({
  data: {
    baseurl:app.store.$state.ASSETSURL,
		pronum:0,//加减的数量
		type:0,//1减 2加
		id:'',//项目id
		moneyIndex:1,
		// flag:false,//是否同意
		// isMoney:true,//是否显示金额选择弹窗,默认隐藏
		money:10,//捐赠的金额
		detailData:{}//详情信息
  },
  onLoad: function (res) {
   this.setData({
		 pronum:res.num,
		 id:res.id
	 })
	 this.getDetail()
  },
  onShow: function () {
  },
	//获取项目详情
	getDetail(){
		let upData = {
			goods_id:this.data.id
		}
		tool.loading()
		api.getProdetail(upData).then(res => {
			console.log('项目详情：',res.data.data);
			tool.loading_h()
			if(res.data.code==1)
			{
				this.setData({
					detailData:res.data.data
				})
			}else{
				tool.alert(res.data.msg)
			}
		})
	},
	//同意协议
	// goAgeen(){
	// 	this.setData({
	// 		flag:!this.data.flag
	// 	})
	// },
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
	// getCustom(e){
	//  let num = e.detail.value
	//  this.setData({
	// 	 moneyIndex:0,
	// 	 money:num
	//  })
	// },
	//捐赠
	goDona(e){
		let updata = {
			goods_id:this.data.id,
			is_team:0,
			parent_order_id:'',
			number:this.data.pronum
		}
		tool.loading()
		api.goDonate(updata).then(res=>{
		tool.loading_h()
			console.log("调起支付:",res);
			let payData = res.data.data
			if(res.data.code==1){
				wx.requestPayment({
					timeStamp:payData.pay_param.timeStamp,
					nonceStr:payData.pay_param.nonceStr,
					package:payData.pay_param.package,
					signType:payData.pay_param.signType,
					paySign:payData.pay_param.paySign,
					success: (res) => {
						tool.alert('支付成功，感谢您的捐赠')
					},
					fail: (err) => {
						tool.alert(err)
					}
				})
			}else{
				tool.alert(res.data.msg)
			}
		})
		// let type = e.currentTarget.dataset.type
		// //type=1 捐赠弹窗显示  2  隐藏
		// if(type==1)
		// {
		// 	this.setData({
		// 		isMoney:false
		// 	})
		// }else
		// {
		// 	this.setData({
		// 		isMoney:true
		// 	})
		// }
		
	},
	//选择金额
	// chooseMon(e){
	// 	let keys = e.currentTarget.dataset.key
	// 	let nums = e.currentTarget.dataset.nums
	// 	this.setData({
	// 		moneyIndex:keys,
	// 		money:nums
	// 	})
	// },
	//确认捐赠
	// goPay(){
	// 	if(this.data.money=='')
	// 	{
	// 		wx.showToast({
	// 			title:'还未选择捐赠的金额噢',
	// 			icon:'none'
	// 		})
	// 		return
	// 	}else if(!this.data.flag)
	// 	{
	// 		wx.showToast({
	// 			title:'请同意并勾选协议',
	// 			icon:'none'
	// 		})
	// 		return
	// 	}
	// }
})