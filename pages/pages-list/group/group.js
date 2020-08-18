// pages/pages-list/group/group.js
import tool from '../../../utils/publics/tool'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList :[
      {id : 1 , imgUrl : ''},
      {id : 2 , imgUrl : ''},
      {id : 3 , imgUrl : ''},
      {id : 4 , imgUrl : ''},
    ],//轮播图列表
    membersList : [
      {id : 1 , imgUrl : '' , title : '爱在日出前' , leave : 3 , time : '2020-01-01 10:12' , join : 1},
      {id : 2 , imgUrl : '' , title : '爱在日出前' , leave : 6 , time : '2020-01-01 10:12' , join : 0},
      {id : 3 , imgUrl : '' , title : '爱在日出前' , leave : 9 , time : '2020-01-01 10:12' , join : 1},
      {id : 3 , imgUrl : '' , title : '爱在日出前' , leave : 9 , time : '2020-01-01 10:12' , join : 1}
    ], //成员列表
    scrollHeight : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getSystemInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     
  },

  //获取手机信息
  getSystemInfo(){
    tool.getSystemInfo().then(res => {
      console.log(res)
      this.setData({
        scrollHeight : (res.screenHeight - 330)*2
      })
    })
  },

  //跳转到捐赠人
  toDonor(e){
    console.log(e)
    var tag = e.currentTarget.dataset.join
    if(tag == 1){
      tool.jump_nav('/pages/pages-list/donor/donor')
    }else{
      return
    }
  },

  //上拉刷新
  addDonor(e){
    console.log(e)
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