// pages/home/tapevent/tapevent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },

  /**
   * 滚动到页面顶部（返回顶部
   */
  // scrollToTop() {
  //   wx.pageScrollTo({
  //     scrollTop: 0,
  //     duration: 300
  //   })
  // },
  scrollToTop() {
    wx.pageScrollTo({
      duration: 3000,
      selector:".pagetop"
    })
  },
  
  /**
   * 滚动到页面指定位置
   */
  // scrollToPosition() {
  //   wx.pageScrollTo({
  //     scrollTop: 6000,
  //     duration: 300
  //   })
  // },
  scrollToPosition() {
    wx.pageScrollTo({
      duration: 300,
      selector:"#pageblock"
    })
  },

  /**
   * 消息提示框Toast
   */
  toastTap() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    })
  },

  /**
   * 点击按钮弹出模态对话框 
   */
  modalTap() {
    wx.showModal({
      title: '学习声明',
      content: '学习小程序的开发是一件有意思的事情，我决定每天打卡学习',
      showCancel: true,
      confirmText: '确定',
      success(res) {
        if (res.confirm) {
          console.log('用户点击了确定')
        } else if (res.cancel) {
          console.log('用户点击了取消')
        }
      }
    })
  },

  /**
   * 手机振动
   */
  vibrateLong() {
    wx.vibrateLong({
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.error(err)
      },
      complete() {
        console.log('振动完成')
      }
    })
  },

  /**
   * 弹出菜单技术文档
   */
  actionSheetTap() {
    wx.showActionSheet({
      itemList: ['添加照片', '删除照片', '更新照片', '查询更多'],
      success(e) {
        console.log(e.tapIndex)
      }
    })
  },

  /**
   * 跳转到新页面与Tab页
   */
  navigateTo() {
    wx.navigateTo({
      url: '/pages/home/imgshow/imgshow'
    })
  },
  switchTab() {
    wx.switchTab({
      url: "/pages/list/list",
    })
  },
  redirectTo() {
    wx.redirectTo({
        url: '/pages/home/imgshow/imgshow'
    })
  },

  /**
   * 返回上一页
   */
  navigateBack() {
    wx.navigateBack({
        delta: 1
    })
  },
})