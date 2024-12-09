// pages/record/record.js

const rec = wx.getRecorderManager()
const audioCtx = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },



  // 录音授权
  getRecordAuth() {
    wx.authorize({ //首次向用户发起授权
      scope: 'scope.record', 
      success() { //如果用户首次授权了，就可以录音了
        console.log("录音授权成功");
      },
      fail(){  //如果用户拒绝了授权，就使用弹窗提示用户要授权录音
        wx.showModal({ 
          title: '提示',
          content: '您未授权录音，录音功能将无法使用',
          showCancel: true,
          confirmText: "授权",
          success(res) {  
            if (res.confirm) { //当用户点击确定之后跳转到设置页
              wx.openSetting({
                success(res){
                  if (!res.authSetting['scope.record']) { 
                  } else {
                    console.log("设置录音授权成功");
                  }
                },
                fail () {
                  console.log("授权设置录音失败");
                }
              })
            } 
          }
        })
      }
    })
  },

  // 格式、录音通道数、采样率、编码码率的设置也是有一定的限制，需要了解相关的音频方面的知识才能自主设置，不然比较容易出错
  startRecord() {
    // 是否授权
    wx.getSetting({
      withSubscriptions: true,
      success (res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
        console.log(res.subscriptionsSetting)
        
      }
    })


    const options = {
      // 毫秒，这里是10s
      duration: 10000,
      // 采样率  
      sampleRate: 44100,
      // 录音通道数 
      numberOfChannels: 2, 
      // 编码码率
      encodeBitRate: 320000, 
      format: 'mp3'
    }
    rec.start(options)
    rec.onStart(() => {
      console.log('录音开始了')
    })

    rec.onStop(res => {
      console.log("录音结束后的对象", res)
      const {tempFilePath, duration, fileSize} = res
      this.setData({
        tempFilePath,
        duration,
        fileSize
      })
    })
  
  },

  playRecord(){
    console.log(this.data)
    audioCtx.src = this.data.tempFilePath
    audioCtx.play()
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