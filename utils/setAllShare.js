import config from '../config'
export default () => {
  wx.onAppRoute(e => {
    let page = getCurrentPages()[getCurrentPages().length - 1]
   console.log('page========',page.data.isUseShare)
    if (page && !page.data.isUseShare) {
      page.onShareAppMessage = e => {
        return config.SHAREINFO
      }
    }
  })
}