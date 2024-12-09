// pages/dbtest/dbtest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async getDaily() {
    // callback 只支持小程序端，不支持云函数端
    // wx.cloud.callFunction({
    //   name: 'zhihu_daily',
    //   success: res => {
    //     console.log("云函数返回的数据",res.result.data)
    //   },
    //   fail: err => {
    //     console.error('云函数调用失败：', err)
    //   }
    // })


    // promise then
    // db.collection('zhihu_daily')
    //   .get()
    //   .then(res => {
    //     // 数据在res.data里
    //     console.log(res.data) 
        
    //     // 在小程序端将数据赋值给Page里的data对象的daily
    //     this.setData({
    //       daily: res.data   
    //     })

    //     // 在回调里将数据赋值给变量
    //     const daily = res.data 
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })


    // async await
    const db = wx.cloud.database() 
    // 注意，因为数据是在get请求对象的data里，所以写法如下
    const daily = (await db.collection('zhihu_daily').get()).data
    // 我们也可以分两次写，注意await 是在async函数里
    const result = await db.collection('zhihu_daily').get()
    // const daily = result.data
    console.log('=====', daily)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 申明一个变量，简化后面的写法
    const db = wx.cloud.database() 
    db.collection('zhihu_daily')
      .get()
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.error(err)
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