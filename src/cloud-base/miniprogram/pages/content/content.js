// pages/content/content.js

// 在content.js里输入以下代码
const app = getApp()
// 凡是写聚合都建议先声明这三个变量，后面也是如此，就不再多介绍了
const db = wx.cloud.database()
const _ = db.command
const $ = db.command.aggregate


Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentData: {},
  },

  // 获取数据
  getContent(options){
    const blogData = app.globalData.blogData
    // console.log(blogData)
    const data = blogData.filter(blog => {
      if (blog.id == options.id) {
        return blog
      }
    })
    // console.log('====data', data, blogData, options.id)
    // console.log(data[0])
    this.setData({
      contentData: data[0]
    })
  },

  /**
   * 更新页面
   */
  async updateViews(options) {
    // 注意options.id的数据类型
    const id = parseInt(options.id, 10) 
    await db.collection('post')
      .where({
        id: id,
        // _openid: '{openid}'
      })
      .update({
        data: {
          views: _.inc(1)
        },
        success: function(res) {
          // console.log('----', res)
        }
      })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getContent(options)
    this.updateViews(options)
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