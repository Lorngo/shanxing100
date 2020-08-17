// pages/pages-list/donate/donate.js
import tool from '../../../utils/publics/tool'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked : true , //是否阅读
    pickerArr : ['123','1234','12345'], //下拉列表
    pickerIndex : 0 , //下拉列表的下标
    pickerValue : '' , //下拉框选中值
    donateImgurl : '' , //上传照片路径
    showImg     : false , //展示图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //是否选中
  changeIcon(){
    console.log('111')
     this.setData({
      checked : !this.data.checked
     })
  },

  //上传图片
  oploadImg(){
     
    tool.chooseImage().then(res => {
      console.log(res)
      this.setData({
        showImg   : true , 
        donateImgurl : res.tempFilePaths[0]
      })
    })

  }, 

  //上传按钮
  uploadbutton(){
    if(this.data.checked == false){
        tool.alert('请阅读并同意协议')
    }
  },
  //下拉框选中
  pickerSelect(e){
    console.log(e)
    var value = e.detail.value
    this.setData({
      pickerValue : this.data.pickerArr[value]
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