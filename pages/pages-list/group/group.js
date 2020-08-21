// pages/pages-list/group/group.js
import tool from '../../../utils/publics/tool'
import api2 from '../../../utils/api/api2'
import api from '../../../utils/api/api'
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
    scrollHeight : 0,
    grounpDetail : {},//小组信息详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      group_id : options.group_id
    })

    this.getSystemInfo()
    this.getGroupDetail(options.group_id)
    this.getGrouppeople(options.group_id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     
  },

  //获取项目详情
  getGroupDetail(id){
    var data = {
      group_id : id
    }

    api2.getGroupDetail(data).then(res => {
        if(res.data.code == 1){
          console.log('项目详情的信息=====',res.data.data)
          this.setData({
            grounpDetail : res.data.data.group_info
          })
        }else{
          console.log('项目详情的错误信息=====',res.data.msg)
        }
    })
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

  //获取小组人员信息列表
  getGrouppeople(id){
    var data = {
      group_id : id,
      limit    :  4
    }

    api2.getGrouppeople(data).then(res => {
      if(res.data.code == 1){
        console.log('小组成员信息的列表====',res.data.data)
        this.setData({
          membersList : res.data.data.member_list
        })

      }else{
        console.log('小组成员的错误信息=====',res.data.msg)
      }
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

  join(){
   
     this.joinGroup()


  },

  //加入小组
  joinGroup(){
    var data = {
      group_id : this.data.group_id
    }
    api2.joinGroup(data).then(res => {
      if(res.data.code == 1){
        console.log('加入小组的信息===',res.data.data)
        this.getGrouppeople()
      }else{
        console.log('加入小组的错误信息===',res.data.msg)
      }
    })
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