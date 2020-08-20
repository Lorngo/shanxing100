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
		imgUrl: '', //显示用的图片路径
		upImgurl: '' //上传的图片路径
	},
	onLoad: function(options) {
		this.getMasslist()
	},
	onShow: function() {

	},
	//上传图片
	oploadImg() {


		let _this = this

		wx.chooseImage({
			success(res) {
				console.log(res);
				if(res.tempFiles[0].size>2097152)
				{
					tool.alert('图片大小不可超过2M')
				}else{
					const tempFilePaths = res.tempFilePaths
						_this.setData({
							imgUrl: res.tempFilePaths[0]
						})
						wx.uploadFile({
							url: 'https://game.vrupup.com/sanguo/yangyuntian/applet/good100/public/api/upload/oss_upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							success(res) {
								var data = JSON.parse(res.data)
								_this.setData({
									upImgurl: data.data.src
								})
							}
						})
					}
				}
		})

	},
	//报名
	goAlpay(e) {
		console.log(e);
		let data = e.detail.value
		let title = ''
		if (!data.name) {
			title = "请填写您的姓名"
		} else if (!data.mobile) {
			title = "请填写您的手机号"
		} else if (!(/^1[345789]\d{9}$/.test(data.mobile))) {
			title = "请填写正确的手机号"
		} else if (this.data.identKey == -1) {
			title = "请选择您的身份"
		} else if (!this.data.provinces) {
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
		} else if (!this.data.imgUrl) {
			title = "请上传您的寸照"
		}
		if (title) {
			tool.alert(title)
			return
		}
		let upData = {
			identity:this.data.identList[this.data.identKey],
			province:this.data.proList[0],
			city:this.data.proList[1],
			area:this.data.proList[2],
			address:data.address,
			name:data.name,
			mobile:data.mobile,
			photo:this.data.upImgurl,		
		}
		if(this.data.identKey!=2)
		{
			upData.email = data.email
			upData.mass_id = this.data.massList[this.data.massKey].mass_id
		}
		if(this.data.identKey!=0)
		{
			upData.industry = data.industry
			upData.vocation = data.vocation
		}
		tool.loading()
		api.applyVolun(upData).then(res=>{
		 tool.loading_h()
		 if(res.data.code==1)
		 {
			 tool.alert('提交成功，请等待审核')
			 setTimeout(res=>{
				 wx.navigateBack({
					 delta:1
				 })
			 },300)
		 }else{
			 tool.alert(res.data.msg)
			 setTimeout(res=>{
			 				 wx.navigateBack({
			 					 delta:1
			 				 })
			 },300)
		 }
		})
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
	//返回
	goBack() {
		wx.navigateBack({
			delta: 1
		})
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
	}
})
