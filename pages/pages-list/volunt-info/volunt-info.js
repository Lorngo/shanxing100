// 志愿者信息页面xw
let app = new getApp()
import tool from "../../../utils/publics/tool.js"
import api from "../../../utils/api/api.js"
Page({
  data: {
    baseurl: app.store.$state.ASSETSURL,
    massList: [], //社团学校列表
    massKey: -1, //社区列表序列号
    identList: ['在校大学生', '校友', '其他'], //身份列表
    identKey: -1, //身份序列号
    region: ['北京市', '北京市', '东城区'], //pick默认选择
    identname: '', //身份名称
    provinces: '', //省市区
    proList: [], //选择后的省市区列表
    massName: '', //社团名称  学校不可选，选择了社团自动对应相应的学校
    isModel:false,//显示提示弹窗
    volunData:{},//志愿者信息
    modelData:{},//模态框提示信息
		isAlter:true,//是否修改
		imgurl:''
  },
  onLoad: function (options) {
    this.getMasslist()
    this.getVolunInfo()
  },
  onShow: function () {

  },
	//获取社团列表
	getMasslist() {
		api.getMassList().then(res => {
			if (res.data.code == 1) {
				this.setData({
					massList: res.data.data.mass_list
				})
			} else {
				tool.alert(res.data.mag)
			}
			console.log('获取到的社列表', res);
		})
	},
	//获取用户志愿者信息
	getVolunInfo(){
		tool.loading('',true)
		api.getVolunInfo().then(res=>{
			tool.loading_h()
			console.log("获取到的志愿者信息",res);
			let data = res.data.data
			if(res.data.code==1)
			{
				let datas = {
					volunData:data,
					provinces:data.province+'-'+ data.city +'-'+ data.area,
					region:[data.province,data.city,data.area],
					imgurl:data.photo
				}
			for(let i=0,len=this.data.identList.length;i<len;i++)
			{
				if(this.data.identList[i]==data.identity)
				{
					datas.identname = data.identity,
					datas.identKey = i
				}
			}
			for(let j=0,len=this.data.massList.length;j<len;j++)
			{
				if(this.data.massList[j].mass_id==data.mass_id)
				{
					datas.massName = this.data.massList[j].mass_name,
					datas.massKey = j
				}
			}
       this.setData(datas)
			}else{
				tool.alert(res.data.msg)
			}
		})
	},
	//返回
	goBack(){
	  wx.navigateBack({
			delta:1
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
	},
	//picker选择期 type 1社团 2身份 3地区
	changePick(e) {
		let type = e.currentTarget.dataset.type
		let value = e.detail.value
		if (type == 1) {
			console.log(e);
			this.setData({
				massName: this.data.massList[value].mass_name,
				massKey: value
			})
		} else if (type == 2) {
			this.setData({
				identname: this.data.identList[value],
				identKey: value
			})
		} else {
			let pro = value[0] + '-' + value[1] + '-' + value[2]
			this.setData({
				provinces: pro,
				proList: value
			})
		}
	},
	
	//提交修改
	goAlpay(e) {
		console.log(e);
		if(this.data.isAlter)
		{
			this.setData({
				isAlter:false
			})
		}else{
			let data = e.detail.value
			let title = ''
			if (!data.name) {
				title = "请填写您的姓名"
			} else if (!data.mobile) {
				title = "请填写您的手机号"
			} else if (!(/^1[345789]\d{9}$/.test(data.mobile))) {
				title = "请填写正确的手机号"
			} else if (!this.data.proList) {
				title = "请选择您所在省市区"
			} else if (!data.address) {
				title = "请填写您所在的具体地址"
			} else if (this.data.identKey != 0 && !data.industry) {
				title = "请填写您的行业"
			} else if (this.data.identKey != 0 && !data.vocation) {
				title = "请填写您的单位名称"
			} else if (this.data.identKey != 2 && !this.data.massName) {
				title = "请选择您所在的社团"
			} else if (this.data.identKey != 2 && !data.email) {
				title = "请填写您的邮箱"
			} else if (this.data.identKey != 2 && !(
					/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
					.test(data.email))) {
				title = "请填写正确的邮箱"
			} 
			if (title) {
				tool.alert(title)
				return
			}
			let upData = {
				identity: this.data.identList[this.data.identKey],
				province: this.data.proList[0],
				city: this.data.proList[1],
				area: this.data.proList[2],
				address: data.address,
				name: data.name,
				mobile: data.mobile,
				photo:this.data.imgurl
			}
			if (this.data.identKey != 2) {
				upData.email = data.email
				upData.mass_id = this.data.massList[this.data.massKey].mass_id
			}
			if (this.data.identKey != 0) {
				upData.industry = data.industry
				upData.vocation = data.vocation
			}
			wx.showModal({
				title:'提示',
				content:'确认提交修改?',
				cancelText:'再想想',
				confirmText:'确认',
				cancelColor:"#666",
				success: (res) => {
					if(res.confirm)
					{
				tool.loading()
				api.applyVolun(upData).then(res => {
					tool.loading_h()
					if (res.data.code == 1) {
						tool.alert('修改成功')
						this.setData({
							isAlter:true
						})
					} else {
						tool.alert(res.data.msg)
					}
				})		
					}
				}
			})
		}
	}
})