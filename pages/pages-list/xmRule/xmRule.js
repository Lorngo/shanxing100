// pages/pages-list/xmRule/xmRule.js
Page({
	
  data: {
    pagetype:''//1 捐赠规则 2 关于我们
  },
  onLoad: function (res) {
    this.setData({
			pagetype:res.type
		})
		if(res.type==2)
		{
			wx.setNavigationBarTitle({
				title:'关于我们'
			})
		}
  },
	
  onShow: function () {

  }
})