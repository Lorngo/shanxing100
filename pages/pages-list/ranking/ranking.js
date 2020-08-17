Page({
	
  data: {
    type:''//1志愿者排名  2非志愿者排名
  },
  onLoad: function (options) {
    this.setData({
			type:options.pagetype
		})
  },
  onShow: function () {

  }
})