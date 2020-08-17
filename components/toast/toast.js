// components/toast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    confimText : {
      type : Object,
      value : {
        title : '恭喜您',
        main : '已成为中国扶贫基金会善行100项目志愿者，发起属于你自己的邀请捐，和大家并肩作战，做孩子们的盖世英雄吧！',
        left : '' ,
        right : '',
        type : 2,
        mainbut : '发起邀请捐'
      }
    },
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    toastShow : false,
    toastShow2 : false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(e){
      this.triggerEvent('tapCancel', {})
    },
    onConfirm(e){
      this.triggerEvent('tapConfirm', {})
    },
    return(){
      this.triggerEvent('tapReturn', {})
    }
  },
  created(){
    console.log('被创建了')
    setTimeout(()=>{
      this.setData({
        toastShow : true
      })
    },500)
    setTimeout(()=>{
      this.setData({
        toastShow2 : true
      })
    },700)
  }
})
