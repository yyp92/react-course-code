// pages/invoke/invoke.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rectangle: {
      width: 22,
      height: 33,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData()
  },

  async getData() {
    // promise
    // wx.cloud.callFunction({
    //   name: "invoke",
    //   data: {
    //     rectangle: this.data.rectangle
    //   }
    // })
    // .then(res => {
    //   console.log("res对象", res)
    // })



    // async await
    // const result = await wx.cloud.callFunction({
    //   name: "invoke",
    //   data: {
    //     rectangle: this.data.rectangle
    //   }
    // })
  
    // console.log("result对象", result) 
    // // 注意这里有两个result，有着不同的含义，注意区分，使用时也可以采用不同的变量名
    // const {result: {circum, area}} = result
    // console.log({circum, area})

    // this.setData({
    //   circum,
    //   area
    // })




    // const result = await wx.cloud.callFunction({
    //   name: "invoke"
    // })
    // console.log("result对象", result) 



    wx.cloud.callFunction({
      name: "invoke",
      data: {
        action: "addPost"
      }
    }).then(res => {
      console.log(res)
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