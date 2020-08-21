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
    leftList: ['进行中', '未完成', '已完成'], //左边列表
    rightList : ['2-3人','3-5人','5人以上'], //右边列表
    selectIndex: 0, //下拉框下标
    showSelect: false, //展示下拉框
    anmSelect: false, //动画的下拉框
    scrollHeight: '', //滑动范围
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

     this.getInviteList(0)

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
    tool.loading()
   if(this.data.select == 1){
    this.getInviteList(index+1)
   }else{
    this.getInviteList(0,index)
   }

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
    if (this.data.showSelect == false) {
        this.setData({
          showSelect: !this.data.showSelect
        })
        setTimeout(() => {
          this.setData({
            anmSelect: !this.data.anmSelect,
          })
        }, 100)
        this.setData({
          select: type,
        })

        if(this.data.select == 1){
          this.setData({
            leftList :['已完成','进行中', '未完成' ],
          })
        }else{
          this.setData({
            leftList :['2-3人','3-5人','5人以上'],
          })
        }

    } else {
      if (this.data.select == type) {
        this.setData({
          showSelect: !this.data.showSelect
        })
        setTimeout(() => {
          this.setData({
            anmSelect: !this.data.anmSelect,
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
            if(this.data.select == 1){
              this.setData({
                leftList :['已完成','进行中', '未完成' ],
              })
            }else{
              this.setData({
                leftList :['2-3人','3-5人','5人以上'],
              })
            }
          }, 500)
        }, 100)
      }


    }



  },

  //加入邀请捐
  toInvite(e){
   var id = e.currentTarget.dataset.id

   tool.jump_nav(`/pages/pages-list/donor/donor?order_id=${id}`)
  },

  //获取列表
  getInviteList(status,join_people){
    if(join_people == undefined){
      var data = {
        status,
      }
    }else{
      if(join_people == 0){
        join_people = '2,3'
      }else if(join_people == 1){
        join_people = '3,5'
      }else{
        join_people = '>5'
      }
      var data = {
        status,
        join_people
      }
    }
    api2.getInviteList(data).then(res => {
      if(res.data.code == 1){
        console.log('邀请捐列表数据====',res.data.data)
       this.setData({
        hotList : res.data.data.list,
        showSelect : false,
        anmSelect : false
       })
       tool.loading_h()
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