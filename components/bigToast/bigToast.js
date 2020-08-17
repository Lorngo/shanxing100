// components/bigToast/bigTosat.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     donnorInfo : {
        type : Object,
        value : {
          name : '',
          ticketHead : '',
          num : '',
          phone : '',
          email : ''
        }
     }
  },

  /**
   * 组件的初始数据
   */
  data: {
      checked :true ,//是否选中
      showToast : true , //展现弹窗
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //切换选中
    changeCheck(){
       this.setData({
         checked : !this.data.checked
       })
    },
    onCancel(e){
      this.triggerEvent('tapCancel', {})
    },
    onConfirm(e){
      this.triggerEvent('tapConfirm', {})
    },
    //返回
    return(){
      this.triggerEvent('tapReturn', {})

    }
  },

    // ready(){
    //   this.setData({
    //     showToast : true
    //   })
    //   console.log('执行了')
    // },

})
