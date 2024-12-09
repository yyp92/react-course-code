// app.js
App({
  // 监听小程序初始化
  onLaunch(options) {
    // console.log('打印小程序启动时的参数', options)
    /**
     * options
     * 
     * path: "" -> 页面路径
     * query: {} -> 页面的参数
     * referrerInfo: {} -> 来源小程序、公众号或 App 的 appId
     * scene: 1047 -> 场景值
     * shareTicket -> 带 shareTicket 的转发可以获取到更多的转发信息，例如群聊的名称以及群的标识 openGId
     */
    

    // 原先代码
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })


    // 加载 loading
    // wx.showLoading({
    //   title: "正在加载中",
    // })


    // 用户权限
    // wx.login({
    //   success(res){
    //     console.log('wx.login得到的数据',res)
    //   }
    // })
    // wx.getSetting({
    //   success(res){
    //     console.log('wx.getSetting得到的数据',res)
    //   }
    // })

    wx.getSetting({
      success: (res) => {
        console.log('wx.getSetting得到的数据', res)

        if (res.authSetting["scope.userInfo"]){
          wx.getUserInfo({
            success: (res) => {
              console.log("wx.getUserInfo得到的数据", res, this)

              // 外边回调都写成箭头函数，否则this指向会有问题
              this.globalData.userInfo = res.userInfo
            }
          })
        }
      }
    })
  },

  // 监听小程序启动或切前台
  onShow: function(options) {
    // wx.hideLoading({
    //   success: (res) => {
    //     console.log("加载完成，所以隐藏掉了")
    //   },
    // })
  },

  // 监听小程序切后台
  onHide: function() {
  },

  // 错误监听函数     
  onError: function(msg) {  
  },

   // 页面不存在监听函数
  onPageNotFound: function() {
  },

  // 未处理的 Promise 拒绝事件监听函数   
  onUnhandledRejection: function() {
  },

  // 监听系统主题变化
  onThemeChange: function() {
  },

  globalData: {
    userInfo: null
  }
})
