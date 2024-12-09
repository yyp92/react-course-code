// pages/home/map/map.js

// callout:点击marker出现气泡callout、以及气泡上的label，可以丰富点击地图标记弹出丰富的信息介绍；
// circle：在地图上显示圆，比如用于显示方圆几公里，或者权重大小在地图的可视化
// polygon：指定一系列坐标点，根据 points 坐标数据生成闭合多边形,，比如圈出实际的范围
// polyline：指定一系列坐标点，从数组第一项连线至最后一项，比如跑步的路线

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 22.540503,
    longitude: 113.934528,
    // markers: [{
    //   id: 1,
    //   latitude: 22.540503,
    //   longitude: 113.934528,
    //   title: '深圳腾讯大厦'
    // }],

    markers: [{
      id: 1,
      latitude: 22.540503,
      longitude: 113.934528,
      title: '深圳腾讯大厦'
      },
      {
        id: 2,
        latitude: 22.540576,
        longitude: 113.933790,
        title: '万利达科技大厦'
      },
      {
        id: 3,
        latitude: 22.522807,
        longitude: 113.935338,
        title: '深圳腾讯滨海大厦'
      },
      {
        id: 4,
        latitude: 22.547400,
        longitude: 113.944370,
        title: '腾讯C2'
    }],
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