// components/bigToast/bigTosat.js
import tool from '../../utils/publics/tool'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    donnorInfo: {
      type: Object,
      value: {
        name: '',
        ticketHead: '',
        num: '',
        phone: '',
        email: ''
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    checked: false, //是否选中
    showName: '',
    ticketHead: '',
    num: '',
    phone: '',
    email: '',
    toastShow : false,
    toastShow2 : false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //切换选中
    changeCheck() {
      this.setData({
        checked: !this.data.checked
      })
    },
    onCancel(e) {
      this.triggerEvent('tapCancel', {})
    },
    onConfirm(e) {
      console.log(this.data.showName)
      this.triggerEvent('tapConfirm', {

      })
    },
    //返回
    return () {
      this.triggerEvent('tapReturn', {})

    },

    //表单提交
    formSubmit(e){
      
      var data = e.detail.value

      if(data.showName == '' && this.checked == false){
        tool.alert('请输入公示名称')
      }else if (data.ticketHead == ''){
        tool.alert('请输入票据抬头')
      }else if(data.num == ''){
        tool.alert('请输入税号')
      }else if(data.num != '' && data.num.length != 18){
        tool.alert('请输入正确的税号')
      }else if(data.phone == ''){
        tool.alert('请输入手机号')
      }else if(data.email == ''){
        tool.alert('请输入邮箱')
      }else if (data.phone != '' && this.checkPhone(data.phone)){
        tool.alert('请输入正确的电话号码')
      }else if(data.email != '' && this.checkEmail(data.email)){
        tool.alert('请输入正确的邮箱')
      }else{

      }

    },

    //验证邮箱
  checkEmail(email) {
    if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) {
      console.log('1111')
      return false
    } else {
      return true
    }
  },

  //验证电话号码
  checkPhone(phone) { // 验证手机号
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      return false;
    } else {
      return true;
    }
  },
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
    },400)
  }
})