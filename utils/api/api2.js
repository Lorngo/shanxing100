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
	//上传图片
	sengImage : (data, url = 'api/upload/oss_upload') => { return myRequest(data, url) },
  //提交邀请捐
  getInvite : (data, url = 'api/order/submit_order') => { return myRequest(data, url) },
  //捐赠小组
  getGroup : (data, url = 'api/group/group_list') => { return myRequest(data, url) },
  //获取小组详情
  getGroupDetail : (data, url = 'api/group/group_detail') => { return myRequest(data, url) },
  //获取小组成员列表
  getGrouppeople :  (data, url = 'api/group/member_list') => { return myRequest(data, url) },
  //加入小组
  joinGroup      :  (data, url = 'api/group/join_group') => { return myRequest(data, url) },
  //获取邀请捐列表
  getInviteList  : (data, url = 'api/order/order_list') => { return myRequest(data, url) },
  //邀请捐详情
  getInviteDetail : (data, url = 'api/order/order_detail') => { return myRequest(data, url) },
  //邀请捐人员置顶
  inviteTop      : (data, url = 'api/order/sub_order_top') => { return myRequest(data, url) },

}