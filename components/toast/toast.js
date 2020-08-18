// components/toast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    confimText : {
      type : Object,
      value : {
        title : '',
        main : '',
        left : '' ,
        right : '',
        type : 0,
        mainbut : ''
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
    },200)
    setTimeout(()=>{
      this.setData({
        toastShow2 : true
      })
    },500)
  }
})
