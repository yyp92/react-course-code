// pages/apidata/apidata.js

const app = getApp()
const md5 = require('../../utils/md5.min.js')

const now = new Date(); 
// 月份需要+1
const month = now.getMonth() + 1 
const day = now.getDate()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // location的写法有很多种，具体可以参考技术文档
    weathertype: "now",
    location: "101010100",

    latitude: "22.540503",
    longitude: "113.934528",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },


  /**
   * 获取掘金 历史的今天
   */
  getHistoryToday() {
    wx.request({
      url: 'http://api.juheapi.com/japi/toh', 
      data: {
        month: month,
        day: day,
        key: app.globalData.juheKeyHistoryToday,
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
      }
    })
  },

  /**
   * 获取和风天气 - 今天的天气
   */
  getTodayWeather() {
    const that = this

    wx.request({
      // url: `https://api.qweather.com/v7/weather/${that.data.weathertype}`,
      url: 'https://devapi.qweather.com/v7/weather/3d',
      data: {
        location: that.data.location,
        key: app.globalData.hefengKey,
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
      }
    })
  },

  /**
   * 获取位置
   */
  getLocation() {
    let that = this
    const { latitude, longitude } = that.data
    const { mapKey, mapSecretKey}= app.globalData
    let SIG = md5("/ws/geocoder/v1?key=" + mapKey + "&location=" + latitude + "," + longitude + mapSecretKey)
    
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1',
      data: {
        key: mapKey,
        location: `${latitude},${longitude}`,
        sig: SIG
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
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