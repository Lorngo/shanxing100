// pages/invite/invite.js
import tool from '../../../utils/publics/tool'
import api from '../../../utils/api/api'
import api2 from '../../../utils/api/api2'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotList: [{
        id: 1,
        title: '今天请为天使点赞',
        peopleName: '张三',
        price: 25800,
        people: 2552
      },
      {
        id: 2,
        title: '今天请为天使点赞',
        peopleName: '张三',
        price: 25800,
        people: 2552
      },
      {
        id: 3,
        title: '今天请为天使点赞',
        peopleName: '张三',
        price: 25800,
        people: 2552
      },
      {
        id: 4,
        title: '今天请为天使点赞',
        peopleName: '张三',
        price: 25800,
        people: 2552
      },
      {
        id: 4,
        title: '今天请为天使点赞',
        peopleName: '张三',
        price: 25800,
        people: 2552
      },
      {
        id: 4,
        title: '今天请为天使点赞',
        peopleName: '张三',
        price: 25800,
        people: 2552
      },
    ], //热门推荐
    select: 0, //下拉框选中
    leftList: ['全部邀请捐', '进行中', '已结束'], //左边列表
    selectIndex: 0, //下拉框下标
    showSelect: false, //展示下拉框
    anmSelect: false, //动画的下拉框
    scrollHeight: '', //滑动范围
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

     this.getInvite()

  },
   
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //前往项目
  toList() {
    tool.jump_nav('/pages/pages-list/xmList/xmList')
  },
	//前往捐赠规则
	toxmRule(){
		tool.jump_nav('/pages/pages-list/xmRule/xmRule?type=1')
		},
  //切换下拉框下标
  changeIndex(e) {
    var index = e.currentTarget.dataset.ind

    this.setData({
      selectIndex: index
    })
  },
  //切换下拉框
  changeSelect(e) {
    var type = e.currentTarget.dataset.type

    if (this.data.select == 0) {
      this.setData({
        select: type,
      })
    }
 

   console.log('select====',this.data.select)
   console.log('type=====',type)

    if (this.data.showSelect == false) {
        this.setData({
          showSelect: !this.data.showSelect
        })
        setTimeout(() => {
          this.setData({
            anmSelect: !this.data.anmSelect
          })
        }, 100)
        this.setData({
          select: type,
        })

    } else {
      if (this.data.select == type) {
        this.setData({
          showSelect: !this.data.showSelect
        })
        setTimeout(() => {
          this.setData({
            anmSelect: !this.data.anmSelect
          })
        }, 100)
      } else {
        this.setData({
          select: type,
        })
        setTimeout(() => {
          this.setData({
            anmSelect: !this.data.anmSelect
          })

          setTimeout(() => {
            this.setData({
              anmSelect: !this.data.anmSelect
            })
          }, 500)
        }, 100)
      }


    }



  },

  //获取列表
  getInvite(){
    var data = {

    }
    api2.getInvite(data).then(res => {
      if(res.data.code == 1){
        console.log('邀请捐列表数据====',res.data.data)
      }else{
        console.log('邀请捐列表的错误信息====',res.data.msg)
      }
    })
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