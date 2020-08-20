//index.js
import api from '../../utils/api/api'
import login from '../../utils/api/login'
import tool from '../../utils/publics/tool'

Page({
  data: {
    isUseShare: true, //是否不配置全局分享
    bannerList: [{
        id: 1,
        imgUrl: ''
      },
      {
        id: 2,
        imgUrl: ''
      },
      {
        id: 3,
        imgUrl: ''
      },
      {
        id: 4,
        imgUrl: ''
      }
    ], //轮播图列表
    xmList: [{
        id: 1,
        title: '今天请为天使点赞',
        sub_title: '你守护世界，我们守护你！',
        price: 25800,
        people: 2552
      },
      {
        id: 2,
        title: '今天请为天使点赞',
        sub_title: '你守护世界，我们守护你！',
        price: 25800,
        people: 2552
      },
      {
        id: 3,
        title: '今天请为天使点赞',
        sub_title: '你守护世界，我们守护你！',
        price: 25800,
        people: 2552
      },
    ], //项目列表
    groundList: [{
        id: 1,
        title: '阳光四人组',
        sub_title: '民办童的梦实验小学 ',
        people: '188'
      },
      {
        id: 2,
        title: '阳光四人组',
        sub_title: '民办童的梦实验小学 ',
        people: '188'
      },
      {
        id: 3,
        title: '阳光四人组',
        sub_title: '民办童的梦实验小学 ',
        people: '188'
      },
    ]

  },
  onLoad(options) {
    this.configure() //核弹系统
    //静默登录
    login.login().then(res => {
      console.log("【静默登录成功】", res)
      //在这里做页面初始化请求操作，可保证本地缓存中有用户的openid/userId
      this.getImage()
      this.getXmlist()
    }).catch(err => {
      console.log("err", err)
    })

   
  },

   //跳转项目图文介绍
   toxmDetail(e){
    console.log(e)
    let id = e.currentTarget.dataset.id

     tool.jump_nav(`/pages/pages-list/xmDetail/xmDetail?goods_id=${id}`)
    
  },

  //跳转小组详情
  togroudDetail(e){
    let id = e.currentTarget.dataset.id
    tool.jump_nav(`/pages/pages-list/group/group?id=${id}`)
  },

  //跳转搜索
  toSearch(){
    tool.jump_nav('../pages-list/search/search')
  },


  //核弹系统
  configure() {
    if (this.data.contentType != -1) {
      return
    }
    api.configure().then(res => {
      let _data = JSON.parse(decodeURIComponent(res.data.data.content.info))
      let _val = _data.custom.h5.val
      this.setData({
        contentType: _val
      })
      _val == 1 ? wx.setNavigationBarTitle({
        title: '自然资源'
      }) : wx.setNavigationBarTitle({
        title: this.data.indexPageTitle
      })
    })
  },

  //获取轮播图
  getImage(){
     
    var data = {
      position : 1 , 
    }

    api.getImage(data).then(res => {
      if(res.data.code == 1){
        console.log('轮播图的信息为-===',res.data.data)
        this.setData({
          bannerList : res.data.data.banner
        })
      }else{
        console.log('轮播图的错误信息=====',res.data.msg)
      }
    })

  },

  //获取项目列表
  getXmlist(){

     var data = {
       limit : 3
     }

     api.getXmlist(data).then(res => {
       if(res.data.code == 1){
         console.log('项目图文介绍的列表信息+====',res.data.data)
         this.setData({
          xmList : res.data.data
         })
       }else{
         console.log('项目图文的错误信息====',res.data.msg)
       }
     })



  },

  onShareAppMessage() {}
})