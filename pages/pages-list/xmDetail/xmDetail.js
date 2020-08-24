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
     user_info : {}, //用户信息
     toastShow : false , //展现弹窗层
     showToast2    : false , //展示弹窗
     anmToast2     : false , 
     donnorCheck  : true , //捐赠金额阅读协议
     plaInput      : '' ,
     moneyList : ['200','400','600','800'] , //选中金额列表
     moneyIndex : -1 ,
     xmDetail :'' , //项目详情
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

   //发起邀请捐
   toDonate(){
      tool.jump_nav(`/pages/pages-list/donate/donate?goods_id=${this.data.xmDetail.goods_id}`)
   },

  //改变协议的选中
  changeCheck(){
    this.setData({
      donnorCheck : !this.data.donnorCheck
    })
  },

   //修改金额
   changeMoney(e){
    var value = e.detail.value

    this.setData({
      moneyIndex :-1,
      donnorMoney : value
    })
    },

  //邀请捐内发起捐赠
  sendInvite(){

    if(this.data.donnorMoney == ''){
      tool.alert('捐赠金额不能为空')
      return
    }
    var data = {
      is_team :0,
      goods_id : this.data.xmDetail.goods_id,
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
 

  //点击捐赠
  donation(){

     if(this.data.user_info.is_volunteer == 0){
      this.setData({
        toastShow : true
      })
     }else{
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
     }

  
  },


  //关闭弹窗
  closeToast(){
    this.setData({
      showToast2 : false,
      anmToast2 : false,
      plaInput  : ''
    })
  },

  //切换金额下标
  changeIndex(e){
    console.log(e)
    var ind = e.currentTarget.dataset.ind

    if(ind == this.data.moneyIndex){
      this.setData({
        moneyIndex : -1
      })
    }else{
      this.setData({
        moneyIndex : ind
      })
    }

 
  },

  //消除弹框
  return(){
    this.setData({
      toastShow :false
    })
  },


  //获取项目详情
  getProdetail(id){
    var data = {
      goods_id : id
    }
    api.getProdetail(data).then(res => {
      if(res.data.code == 1){
        console.log('项目详情的信息====',res.data.data)
        this.setData({
          xmDetail : res.data.data.goods_info,
          user_info : res.data.data.user_info

        })
      }else{
        console.log('项目详情的错误信息====',res.data.msg)
      }
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
    this.getProdetail(options.goods_id)
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