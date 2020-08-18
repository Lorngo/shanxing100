import { myRequest } from './request'
import  config  from '../../config'
export default {
  /**
   ****模板默认接口【勿删】
   */
  //原始方法
  myRequest,
  //核弹系统配置 
  configure: (data, url = `https://game.flyh5.cn/game/wx7c3ed56f7f792d84/data_system/api.php?a=web&code=${config.CONFIGURE}`) => { return myRequest(data, url, 'get', true, true) },
  //获取openid
  getOpenid: (data, url = 'https://game.vrupup.com/sanguo/yangyuntian/applet/good100/public/api/oauth/oauth_login') => { return myRequest(data, url, 'post', true, true) },
  //上传头像昵称
  uploadUserInfo: (data, url = 'api/oauth/perfect_info') => { return myRequest(data, url) },
  /**
   ****项目接口
   */
	//获取图片
	getImage : (data, url = 'api/banner/get_banner') => { return myRequest(data, url) },
  //获取签名[示例--可删]
  getJoinVoIPChatSignature: (data, url = '/api/oauth/encrypt') => { return myRequest(data, url) },
	//项目列表
	getXmlist:(data, url = 'api/goods/goods_list') => { return myRequest(data, url) },
	//项目详情
	getProdetail:(data, url = 'api/goods/goods_detail') => { return myRequest(data, url) },
	//项目详情内发起捐赠
<<<<<<< HEAD
	goDonate:(data, url = 'api/order/submit_order') => { return myRequest(data, url) },
	//获取用户信息
	getUserInfo:(data, url = 'api/user/user_info') => { return myRequest(data, url) },
=======
  goDonate:(data, url = 'api/order/submit_order') => { return myRequest(data, url) }
  //
>>>>>>> 5f5d00608f09b5d7b7a8a15da9302112811e62d0
}