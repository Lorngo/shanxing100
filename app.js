//app.js
import store from './utils/store/index'
import auth from './utils/publics/authorization'
import { backgroundAudio } from './utils/backgroundAudio'
import robotInit from './utils/robot-init'
import setAllShare from './utils/setAllShare'
App({
  onLaunch(opation) {
    //腾讯统计
    auth.statistics(500689212)
    //全局分享
    setAllShare()
    //背景音乐
    backgroundAudio(this, false)
    //机器人
    robotInit.robotInit()
  },
  store,//状态管理
  globalData: {
    CONFIGURE: "tJ4GXH2P2luArDVm0u9",//核弹系统码
    BGMURL: 'https://game.flyh5.cn/resources/game/wechat/szq/ftxiyouji/images/music.mp3',//背景音乐音频地址
    REQUESTURL: 'https://game.vrupup.com/sanguo/yangyuntian/applet/good100/public/',//接口请求路径
    ASSETSURL: 'https://img.vrupup.com/web/wyl/shanxing100'//线上资源路径
  }
})