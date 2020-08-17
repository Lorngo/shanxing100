let app = new getApp()
import api from '../../../utils/api/api'
Page({
  data: {
    baseurl:app.globalData.ASSETSURL,
		nomore:3,//1=加载更多 2=加载中 3=暂无数据
		pronumList:[3,1,1,1],//加减的数量
		type:0,//1减 2加
		proIndex:-1//操作的项目序号
  },
  onLoad: function (options) {
		
			
		this.getXmlist()

  },
  onShow: function () {

  },
	//加减操作
	operaData(e){
		let types = e.currentTarget.dataset.types
		let key = e.currentTarget.dataset.index
		this.setData({
			proIndex:key,
			type:types
		})
		//types=1 减 =2 加
		if(this.data.pronumList[key]>1&&types==1)
		{
			let num = this.data.pronumList[key]
			num-- 
			let nums = 'pronumList['+key+']'
			this.setData({
				[nums]:num
			})
		}else if(types==2)
		{
			let num = this.data.pronumList[key]
			num++
			let nums = 'pronumList['+key+']'
			this.setData({
				[nums]:num
			})
		}
	},
	//跳转详情
	goPage(e){
		let key = e.currentTarget.dataset.index
		wx.navigateTo({
			url:'../project-detail/project-detail?num='+this.data.pronumList[key]
		})
	},

	//获取项目列表
	getXmlist(){
		var data = {
			 page : 1
		}

		api.getXmlist(data).then(res => {
			if(res.data.code == 1){
				console.log('项目列表的值=====',res.data.data)
			}else{
				console.log('项目列表错误信息======',res.data.msg)
			}
		})
	}
})