// import auth from '../publics/authorization'
// import api from './api'
// import tool from '../publics/tool'

// //登录
// const login = (again) => {
//   return new Promise((resolve, reject) => {
//     let _userInfo = wx.getStorageSync("userInfo") || {}
//     if (!again &&_userInfo.openid) {
//       resolve(_userInfo)
//       return 
//     }
//     tool.loading("")
//     auth.login().then(res => {
//       return res
//     }).then(res => {
//       return api.getOpenid({ js_code: res.code })
//     }).then(res => {
//       tool.loading_h()
//       let userInfo = wx.getStorageSync("userInfo") || {}
//       Object.assign(userInfo, res.data.data)
//       wx.setStorageSync("userInfo", userInfo)
//       resolve(res.data.data)
//     }).catch(err => {
//       tool.loading_h()
//       reject(err) 
//     })
//   })
// }

// //授权
// const authorize = (e) => {
//   return new Promise((resolve, reject) => {
//     tool.loading("授权中")
//     const userInfo = e.detail.userInfo
//     if (userInfo) {
//       Object.assign(userInfo, wx.getStorageSync("userInfo") || {})
//       getApp().store.setState({ userInfo })
//       wx.setStorageSync("userInfo", userInfo)
//       tool.loading_h()
//       //这里做上传头像昵称给后台操作
//       api.uploadUserInfo({
//         openid: wx.getStorageSync("userInfo").openid,
//         nickname: userInfo.nickName,
//         headimg: userInfo.avatarUrl
//       }).then(res => {
//         tool.loading_h()
//         resolve(true)
//       }).catch(err => {
//         reject(err)
//       })
//     } else {
//       tool.loading_h()
//       resolve(false)
//     }
//   })
// }

// module.exports = { login, authorize }


import auth from '../publics/authorization.js'
// import api from './api.js'
import tool from '../publics/tool.js'
import _http from './request.js'
const glb = getApp().globalData;
//登录
const _request = (data, url) => { 
  const token = wx.getStorageSync('APPTOKEN');
  let _url = glb.REQUESTURL + url;
  console.log(_url,'======9');
  return new Promise((resolve, reject) => {
  if(glb.APPTOKEN==token&&glb.APPTOKEN){
        resolve(token);
        return;
  }
    wx.login({
        success: res => {
            data.js_code = res.code;
            _http[`${'post'}P`](_url, data).then(res => {
              if(res.data.code==1){
                resolve(res.data.data);
                wx.setStorageSync("APPTOKEN", res.data.data.user_info.open_id);
                glb.APPTOKEN = res.data.data;
              }else{
               tool.alert(res.data.msg)
              }
            }).catch(err => {
                console.log("登录失败",err);
                reject(res);
            })
        }
      })
})
}

//授权
// const authorize = (e) => {
//   return new Promise((resolve, reject) => {
//     tool.loading("授权中")
//     const userInfo = e.detail.userInfo
//     if (userInfo) {
//       Object.assign(userInfo, wx.getStorageSync("userInfo") || {})
//       wx.setStorageSync("userInfo", userInfo)
//       tool.loading_h()
//       //这里做上传头像昵称给后台操作
//       api.uploadUserInfo({
//         openid: wx.getStorageSync("userInfo").openid,
//         nickname: userInfo.nickName,
//         headimg: userInfo.avatarUrl
//       }).then(res => {
//         tool.loading_h()
//         resolve(true)
//       }).catch(err => {
//         reject(err)
//       })
//     } else {
//       tool.loading_h()
//       resolve(false)
//     }
//   })
// }

module.exports = { 
    _request,
  }