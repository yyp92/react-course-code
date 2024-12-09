// pages/music/music.js

// 也可以创建多个音频播放实例，这样可能会出现同时播放多个音乐的情况，你可以按需求来处理
const audioCtx = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  // 播放
  audioPlay() {
    audioCtx.play()
  },
  // 暂停
  audioPause () {
    audioCtx.pause()
  },
  // 跳转到指定时间
  audioSeek() {
    audioCtx.seek(20.134)
  },
  // 音乐的重新播放是没有相应的接口的，但是可以使用seek(0)来实现
  audioStart() { 
    audioCtx.seek(0)
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
    audioCtx.src = 'https://tcb-1251009918.cos.ap-guangzhou.myqcloud.com/post/springtime.mp3'

    audioCtx.onPlay(() => {
      console.log("音乐正在播放")
    })

    audioCtx.onTimeUpdate(() => {
      const {currentTime, duration} = audioCtx   
      const progress = Math.floor((currentTime /duration)*100) 

      this.setData({
        currentTime,
        duration,
        progress
      })

      console.log(`当前进度为：${audioCtx.currentTime}音乐播放总时长为：${audioCtx.duration}`);
    })
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