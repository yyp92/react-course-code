// pages/snapshot/snapshot.js

// 在页面中连接数据库并查询数据示例
const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that =this
    const watcher = db.collection('livevideo').doc('room2020032101')
    .watch({
      onChange: function(snapshot) {
        that.setData({
          stars:snapshot.docs[0].star
        })
        console.log('文档数据发生变化', snapshot)
      },
      onError: function(err) {
        console.error('监听因错误停止', err)
      }
    })
  },


  addStar(){
    db.collection('livevideo').doc('room2020032101').update({
      data: {
        star:  _.inc(1)
      },
      success: console.log,
      fail: console.error
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