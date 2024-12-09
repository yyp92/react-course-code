// pages/userHobby/userHobby.js

const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 数组查询操作符
   */
  viewArray() {
    db.collection('user_hobby')
      .where({
        _openid: '{openid}',

        // 同时订阅了房产频道和财经频道的用户
        // tags: _.all(["房产", "财经"]),
        // tags: _.size(5), 
        tags: _.elemMatch(_.eq("财经"))
      })
      .get()
      .then(res => {
        console.log('all: ', res)
      })
      .catch(e => {
        console.log('e: ', e)
      })
  },

  /**
   * 数组的增删更新操作符
   */
  updateArray() {
    db.collection('user_hobby')
      .where({
        _openid: '{openid}',
        tags:_.elemMatch(_.eq("财经"))
      })
      .update({
        data: {
          tags: _.push({
            // 把3个元素添加到数组
            each: ["漫画", "视频", "历史"],
            // 从第4位开始也就是第3位的后面添加
            position: 3,
            // 数组只保留前 n 个元素，n为0时数组会被清空；为负数时，只保留后 n 个元素
            slice: 6,
            // sort:1, 给定 1 代表升序，-1 代表降序，由于sort的中文排序并没有那么理想，而且还会打算position的位置，所以你可以按情况来使用
          })
        }
      })
      .then(res => {
        console.log('succus:', res)
      })
      .catch(e => {
        console.log('e:', e)
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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