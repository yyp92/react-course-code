// pages/video/video.js

const base = require('../../utils/base.js')
const {getRandomColor} = base

Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: {
      poster: "https://tcb-1251009918.cos.ap-guangzhou.myqcloud.com/demo/video.png",
      src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    },
    controls: true,
    showprogress: true,
    loop: false,
    autoplay: false,
    muted: false,

    // 弹幕
    danmuList:[
      {
        // 弹幕的内容
        text: '云开发真的很有用',
        // 弹幕的颜色
        color: '#ff0000',
        // 第1秒出现的弹幕
        time: 1  
      },
      {
        text: '用来开发一个完整的项目确实很方便',
        color: '#ff00ff',
        time: 3
      }
    ],
  },



  playVideo(){
    this.videoCtx.play()
  },
  pauseVideo(){
    this.videoCtx.pause()
  },
  stopVideo(){
    this.videoCtx.stop()
  },
  seekVideo(){
    this.videoCtx.seek(120)
  },
  playRate(){
    this.videoCtx.playbackRate(2.0)
  },
  // danmuTime事件处理函数，这个触发频率是250ms一次
  danmuTime(e) {
    console.log("视频播放的当前时间", e.detail.currentTime)
  },

  // 发送弹幕
  async sendDanmu(e) { 
    const danmu = e.detail.value.danmu
    const time = this.danmuTime

    this.videoCtx.sendDanmu({
      text: danmu ,
      // color: "#000000",
      color: getRandomColor(),
      time: Math.ceil(time)
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.videoCtx = wx.createVideoContext('myVideo')
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