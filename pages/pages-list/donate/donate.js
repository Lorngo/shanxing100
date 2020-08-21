// pages/pages-list/donate/donate.js
import tool from '../../../utils/publics/tool'
import api from '../../../utils/api/api2'

var app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    InterfaceUrl : 'https://game.vrupup.com/sanguo/yangyuntian/applet/good100/public/',
    checked: true, //是否阅读
    pickerArr: ['123', '1234', '12345'], //下拉列表
    pickerIndex: 0, //下拉列表的下标
    pickerValue: '', //下拉框选中值
    donateImgurl: '', //上传照片路径
    showImg: false, //展示图片
    donateTitle: '今天请为天使点赞', //标题
    slogan : '献出一点爱心，收获一份真诚' , //口号
    goods_id : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
      goods_id : options.goods_id
     })
  },

  //是否选中
  changeIcon() {
    this.setData({
      checked: !this.data.checked
    })
  },

  //发起邀请捐接口
  getInvite(money) {
    var data = {
      is_team: 1,
      goods_id : this.data.goods_id,
      money,
      slogan:this.data.slogan,
      title: this.data.donateTitle,
      image: this.data.uploadUrl
    }

    api.getInvite(data).then(res => {
      if (res.data.code == 1) {
        console.log('发起邀请捐成功信息====', res.data.data)
      } else {
        console.log('发送邀请卷的错误信息+===', res.data.msg)
        tool.alert(res.data.msg)
      }
    })
  },


  //上传图片
  oploadImg() {


    let _this = this

    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        _this.setData({
          showImg: true,
          donateImgurl: res.tempFilePaths[0]
        })
        wx.uploadFile({
          url: `${_this.data.InterfaceUrl}api/upload/oss_upload`, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            var data = JSON.parse(res.data)
            _this.setData({
              uploadUrl: data.data.src
            })

            console.log(_this.data.uploadUrl)
          }
        })
      }
    })

  },

  //上传按钮
  formSubmit(e) {
    var money = 200
    var slogan = e.detail.value.slogan
    if (money != 200) {
      tool.alert('每个队伍捐赠金额为200元')
      return
    }
    if (this.data.donateImgurl == '') {
      tool.alert('请上传照片')
      return
    } 
    if (this.data.checked == false) {
      tool.alert('请阅读并同意协议')
      return
    }
      this.getInvite(money, slogan)
  },


  //下拉框选中
  pickerSelect(e) {
    console.log(e)
    var value = e.detail.value
    this.setData({
      pickerValue: this.data.pickerArr[value]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})