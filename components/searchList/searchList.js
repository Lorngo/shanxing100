// components/searchList/searchList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      list:{
        type: Array,
        value : {
          id     : '' , 
           title : '',
           peopleName : '',
           price : '',
           people : '',
        }
      },
      scrollHeight : {
        type : Number,
        value : ''
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
