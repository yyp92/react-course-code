// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headData: {
      title: '头部',
      desc: '头部描述'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 了解网络状态
    // wx.getNetworkType({
    //   success(res) {
    //     console.log(res)
    //   }
    // });


    // 获取设备信息
    // wx.getSystemInfo({
    //   success (res) {
    //     console.log("设备的所有信息",res)
    //     console.log(res.model)
    //     console.log(res.pixelRatio)
    //     console.log(res.windowWidth)
    //     console.log(res.windowHeight)
    //     console.log(res.language)
    //     console.log(res.version)
    //     console.log(res.platform)
    //   }
    // })


    // 页面链接跳转
    // wx.navigateTo({
    //   url: '/pages/home/imgshow/imgshow'
    // })

    // 返回上一级
    // wx.navigateBack({
    //   delta: 1
    // })


    // 显示消息提示框
    // wx.showToast({
    //   title: '弹出成功',
    //   icon: 'success',
    //   duration: 1000
    // })


    // 设置当前页面的标题
    // wx.setNavigationBarTitle({
    //   title: '控制台更新的标题'
    // })


    // 打开文件选择器上传文件
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original', 'compressed'],
    //   sourceType: ['album', 'camera'],
    //   success (res) {
    //     const tempFilePaths = res.tempFilePaths
    //   }
    // })


    // API的可用性
    // wx.canIUse('console.log')
    // wx.canIUse('CameraContext.onCameraFrame')
    // wx.canIUse('CameraFrameListener.start')
    // wx.canIUse('Image.src')

    // // wx接口参数、回调或者返回值
    // wx.canIUse('openBluetoothAdapter')
    // wx.canIUse('getSystemInfoSync.return.safeArea.left')
    // wx.canIUse('getSystemInfo.success.screenWidth')
    // wx.canIUse('showToast.object.image')
    // wx.canIUse('onCompassChange.callback.direction')
    // wx.canIUse('request.object.method.GET')

    // // 组件的属性
    // wx.canIUse('live-player')
    // wx.canIUse('text.selectable')
    // wx.canIUse('button.open-type.contact')


    // 提前发起权限设置
    // scope.userInfo 是否允许获取用户信息
    // scope.record 是否允许录音
    // scope.writePhotosAlbum 是否允许保存到相册等等
    // wx.authorize({
    //   scope: 'scope.record',
    //   success () {
    //     // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //     wx.startRecord()
    //   }
    // })


    // 通过 getApp() 获取 globalData
    // const app = getApp()
    // console.log('user页面打印的app', app)
    // console.log('user页面打印的globalData', app.globalData.userInfo)
    // console.log('user页面打印的tcbData',app.tcbData.eventInfo)
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

  },

  /**
   * 页面滚动触发事件的处理函数
   */
  onPageScroll: function() {
  },

  /**
   * 页面尺寸改变时触发
   */
  onResize: function() {
  },

  /**
   * 当前是 tab 页时，点击 tab 时触发
   */
  onTabItemTap: function() {
  }
})