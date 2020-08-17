// 志愿者信息页面xw
Page({
  data: {
    schooList:['林科大','铁道学院','网晨大学'],//学校列表
		identList:['高校志愿者','社会志愿者'],//身份列表
		schoolname:'',//学校名称
		identname:'',//身份名称
		provinces:'',//省市区
		region: ['北京市', '北京市', '东城区'],
		isAlter:true//是否修改
  },

  onLoad: function (options) {

  },
	
  onShow: function () {

  },
	//返回
	goBack(){
	  wx.navigateBack({
			delta:1
		})
	},
	//修改
	goChange(){
		this.setData({
			isAlter:!this.data.isAlter
		})
	},
	//picker选择期 type 1学校 2身份 3地区
	changePick(e){
		let type = e.currentTarget.dataset.type
		let value = e.detail.value
		if(type==1)
		{
			this.setData({
				schoolname:this.data.schooList[value]
			})
		}else if(type==2)
		{
			this.setData({
				identname:this.data.identList[value]
			})
		}else{
			let pro = value[0]+'-'+value[1]+'-'+value[2]
			this.setData({
				provinces:pro
			})
		}
	}
})