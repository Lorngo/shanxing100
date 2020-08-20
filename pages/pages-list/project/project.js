let app = new getApp()
import api from '../../../utils/api/api'
import tool from '../../../utils/publics/tool.js'
Page({
  data: {
    baseurl:app.store.$state.ASSETSURL,
		nomore:1,//1=加载更多 2=加载中 3=暂无数据
		page:1,//页数
		limit:10,//每页展示的条数
		pronumList:[],//项目列表
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
		//单价
		let unit = this.data.pronumList[key].price
		let nums = 'pronumList['+key+'].num'
		let total = 'pronumList['+key+'].total'
		//types=1 减 =2 加
		if(this.data.pronumList[key].num>1&&types==1)
		{
			let num = this.data.pronumList[key].num
			num-- 
			this.setData({
				[nums]:num,
				[total]:num*unit
			})
		}else if(types==2)
		{
			let num = this.data.pronumList[key].num
			num++
			this.setData({
				[nums]:num,
				[total]:num*unit
			})
			console.log(this.data.pronumList);
		}
	},
	//跳转详情
	goPage(e){
		let num = e.currentTarget.dataset.num
		let id = e.currentTarget.dataset.id
		wx.navigateTo({
			url:'../project-detail/project-detail?num='+num+'&id='+id
		})
	},
	//上拉加载
  lowerData(){
		this.getXmlist()
	},
	//获取项目列表
	getXmlist(){
    let upData = {
			page:this.data.page,
			limit:this.data.limit
		}
		if(this.data.nomore==1)
		{
			this.setData({
				nomore:2
			})
			api.getXmlist(upData).then(res => {
				if(res.data.code == 1){
					console.log('项目列表:',res.data.data)
					let list = res.data.data.list
					for(let i=0,len=list.length;i<len;i++)
					{
						list[i].num = 1
						list[i].total = list[i].price
					}
					this.setData({
						page:this.data.page + 1,
						pronumList:this.data.pronumList.concat(list)
					})
					if(list.length<10)
					{
						this.setData({
							nomore:3
						})
					}else{
						this.setData({
							nomore:1
						})
					}
				}else{
					tool.alert(res.data.msg)
					this.setData({
						nomore:3
					})
				}
			})
		}
	}
})