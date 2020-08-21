// pages/pages-list/donor/donor.js

let app = new getApp()
import WxCountUp from '../../../utils/countUp.min.js'
import api2 from '../../../utils/api/api2.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl : app.store.$state.ASSETSURL,
    hour : 4, //小时时间
    day  : '05' , //天数时间
    sortCheck: false, //选择捐赠金额还是时间排序
    peopleList: [{
        id: 1,
        userName: '风也温柔',
        leave: 4,
        identity: '助力者',
        money: 50,
        time: '2020-01-01 10:12'
      },
      {
        id: 2,
        userName: '风也温柔',
        leave: 8,
        identity: '助力者',
        money: 50,
        time: '2020-01-01 10:12'
      },
      {
        id: 3,
        userName: '风也温柔',
        leave: 6,
        identity: '助力者',
        money: 50,
        time: '2020-01-01 10:12'
      },
      {
        id: 3,
        userName: '风也温柔',
        leave: 6,
        identity: '助力者',
        money: 50,
        time: '2020-01-01 10:12'
      },
    ], //人员列表
    showToast: false, //展示弹窗
    toastOptions: {
      confimText: {
        title: '温馨提示',
        main: '若后续需开发票，请联系客服，提供捐赠截图进行审核，预计7-15个工作日完成审核',
        left: '确认不开票',
        right: '继续开票'
      }
    },
    showsmallToast: false, //温馨提示
    order_id : '' , //邀请捐id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var order_id = options.order_id
    this.setData({
      order_id
    })

    this.countDown()
   
     this.getInviteDetail(order_id)


  },

  //邀请捐详情
  getInviteDetail(order_id){
    var data = {
      order_id,

    }

    api2.getInviteDetail(data).then(res => {
      if(res.data.code == 1){
        console.log('邀请捐详情的信息=====',res.data.data)
      }else{
        console.log('邀请捐详情的错误信息====',res.data.msg)
      }
    })

  },

  //倒计时
  countDown(){
    var hour = this.data.hour
    var day  = this.data.day
    if(this.data.hour != 0){
     let timer =  setInterval(() =>{
        let num = this.data.hour-1
       if(num == 0){
         var num2 = this.data.day-1
         this.countUp = new WxCountUp('day', num2, { decimalPlaces:0, useGrouping: false }, this)
         this.setData({
           day : num2,
           hour :24
         })
         if(num == 0 && num2 == 0){
          clearInterval(timer)
         }
       }else{
        this.countUp = new WxCountUp('hour', num, { decimalPlaces:0, useGrouping: false }, this)
        this.setData({
         hour : num
        })
       }
      },1000)
    
    }
  },



  //置顶
  toTop(e){
    var id = e.currentTarget.dataset.id
  },

  //隐藏弹窗
  return () {
    this.setData({
      showToast: false
    })
  },

  //scroll触底
  scrollLower(e){
     console.log(e)
  },

  //展示弹窗
  showToast() {
    this.setData({
      showToast: true
    })
  },

  //放弃开票
  onCancel() {
    this.setData({
      showToast: false
    })
  },

  //提交
  onConfirm() {
    this.setData({
      showToast: false
    })

    setTimeout(() => {
      this.setData({
        showsmallToast: true,
      })

    }, 500)
  },

  //关闭小弹窗
  returnsmall(){
    this.setData({
      showsmallToast : false
    })
  },

  //小弹窗左边按钮
  cancelsmall(){
    this.setData({
      showsmallToast : false
    })
  },


  //提交
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
    clearInterval(timer)
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