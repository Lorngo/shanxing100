// pages/pages-list/donor/donor.js

let app = new getApp()
import WxCountUp from '../../../utils/countUp.min.js'
import api2 from '../../../utils/api/api2.js'
import tool from '../../../utils/publics/tool'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl : app.store.$state.ASSETSURL,
    isUseShare : true, //控制分享
    hour : 4, //小时时间
    day  : '05' , //天数时间
    sortCheck: false, //选择捐赠金额还是时间排序
    orderList : {}, //邀请捐信息
    peopleList: [
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
    donnorMoney : '' , //捐赠金额
    donnorCheck  : true , //捐赠金额阅读协议
    showToast2    : false , //展示弹窗
    anmToast2     : false , 
    plaInput      : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id = options.order_id
    this.setData({
      order_id
    })

    // this.countDown()
  


  },

  //改变协议的选中
  changeCheck(){
    this.setData({
      donnorCheck : !this.data.donnorCheck
    })
  },

  //邀请捐详情
  getInviteDetail(order_id){
    var data = {
      order_id,

    }

    api2.getInviteDetail(data).then(res => {
      if(res.data.code == 1){
        console.log('邀请捐详情的信息=====',res.data.data)
        this.setData({
          orderList : res.data.data.order_info,
          peopleList : res.data.data.sub_order_list
        })
        tool.loading_h()
      }else{
        console.log('邀请捐详情的错误信息====',res.data.msg)
      }
    })

  },

  //置顶邀请记录 发起人使用
  inviteTop(){
    var data = {

    }
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

  

  //修改金额
  changeMoney(e){
    console.log(e)
    var value = e.detail.value
    var max = 200 - this.data.orderList.amount

    if(max <value){
     tool.alert('您已超过最大捐赠值')
     this.setData({
      donnorMoney : max
     })
     return
    }else{
      this.setData({
        donnorMoney : value
      })
    }

   


  },

  //置顶
  toTop(e){
    var id = e.currentTarget.dataset.id

    api2.inviteTop(data).then(res => {
      if(res.data.code == 1){
        console.log('置顶成功的信息===',res.data.data)
      }else{
        console.log('发起成功的错误信息===',res.data.msg)
      }
    })
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

  //发起捐赠
  toDonation(){
    
    this.setData({
      showToast2 : true
    })
    setTimeout(() => {
     
       this.setData({
         anmToast2 : true,
        
       })

    },100)
    setTimeout(() => {
      this.setData({
        plaInput  : '输入您想捐赠的金额'
      })
    },500)

  },

  //关闭捐赠窗口
  closeToast(){
    this.setData({
      showToast2 : false,
      anmToast2 : false,
      plaInput  : ''
    })
  },

  //邀请捐内发起捐赠
  sendInvite(){

    if(this.data.donnorMoney == ''){
      tool.alert('捐赠金额不能为空')
      return
    }
    var data = {
      is_team :1,
      goods_id : this.data.orderList.goods_id,
      parent_order_id : this.data.orderList.order_id,
      money  :  this.data.donnorMoney
    }
   
   let _this = this

     api2.getInvite(data).then(res => {
       if(res.data.code == 1){
         console.log('捐赠成功的信息====',res.data.data)

         var data = res.data.data.pay_param

         wx.requestPayment({
           nonceStr: data.nonceStr,
           package: data.package,
           paySign: data.paySign,
           timeStamp: data.timeStamp,
           signType : data.signType,
           success(res){
             console.log(res)
             tool.alert('感谢您的捐款')
             _this.setData({
              showToast2 : false,
              anmToast2 : false,
              plaInput  : ''
            })
             _this.onShow()
           },
           fail(res){
             console.log('错误信息')
           }
         })

       }else{
         console.log('捐赠成功的错误信息====',res.data.msg)
         tool.alert(res.data.msg)
       }
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
    tool.loading()
   
    this.getInviteDetail(this.data.order_id)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // clearInterval(timer)
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
  onShareAppMessage: function (res) {
    console.log(this.data.orderList.good_name)
  //  if(res.from === 'button'){

  //  }
   return{
     title : `${this.data.orderList.good_name}`,
     imageUrl : `${this.data.orderList.thumb}`,
     path: `/pages/pages-list/donor/donor?order_id=${this.data.order_id}`
   }

  }
})