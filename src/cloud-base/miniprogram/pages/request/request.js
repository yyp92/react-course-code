// pages/request/request.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    stories: [],
    top_stories: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    // wx.request({
    //   // 知乎日报最新话题
    //   url: 'https://news-at.zhihu.com/api/4/news/latest', 
    //   header: {
    //     // 默认值
    //     'content-type': 'application/json' 
    //   },
    //   success(res) {
    //     console.log('网络请求成功之后获取到的数据', res)
    //     console.log('知乎日报最新话题', res.data)
    //   }
    // })



    
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest', 
      header: {
        'content-type': 'application/json' 
      },
      success(res) {
        let date = res.data.date
        let stories = res.data.stories
        let top_stories = res.data.top_stories

        that.setData({
          date,
          stories,
          top_stories
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})