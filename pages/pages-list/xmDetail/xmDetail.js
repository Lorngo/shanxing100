// pages/pages-list/xmDetail/xmDetail.js
import tool from '../../../utils/publics/tool'
import api from '../../../utils/api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
     toastOptions:{
       confimText : {
        title : '通知',
        main : '只有注册成为高校志愿者/社会志愿者才能发起邀请捐，快邀请你的朋友们一起为爱助力吧！',
        left : '注册志愿者',
        type : 1,
        right : '直接捐赠'
       }
     },
     xmDetail : {}, //项目列表信息
     toastShow : false , //展现弹窗层
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tool.loading()
     console.log(options)
     var id = options.id
     this.getProdetail(id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

   //项目列表详情
   getProdetail(id){
     var data = {
      goods_id : id
     }

     api.getProdetail(data).then(res => {
       if(res.data.code == 1){
         console.log('项目列表的详情信息====',res.data.data)
         this.setData({
          xmDetail : res.data.data
         })
         setTimeout(() =>{
          tool.loading_h()
         },100)
       }else{
         console.log('项目列表的错误信息====',res.data.msg)
       }
     })
   },

   //发起邀请捐
   toDonate(){
      tool.jump_nav(`/pages/pages-list/donate/donate?goods_id=${this.data.xmDetail.goods_id}`)
   },

  //点击捐赠
  donation(){
    this.setData({
      toastShow : true
    })
  },

  //消除弹框
  return(){
    this.setData({
      toastShow :false
    })
  },

  //直接捐赠
  confirm(){
    tool.alert('感谢您的捐赠')
    this.setData({
      toastShow :false
    })
  },

  //注册志愿者
  cancel(){
    console.log('被触发了===')
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