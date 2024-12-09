// pages/animate/animate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation: ""
  },



  /**
   * 监听动画
   * 
   * bindtransitionend（监听动画过渡是否结束）
   * bindanimationstart（监听动画是否开始）
   * bindanimationiteration（监听动画是否结束一个阶段） 
   * bindanimationend（监听动画是否结束）
   */
  addAnimation() {
    this.setData({
      animation: "fadeIn"
    })
  },
  transitionEnd() {
    //只能监听transition类的动画
    console.log('渐变已结束')
  },
  animationStart() {
    //如果动画有delay，该监听函数会在delay之后立即执行
    console.log('动画开始')
  },
  animationIteration() {
    //animation支持多次执行动画，执行完一次就会触发该函数
    console.log("动画执行完了一次")
  },
  animationend() {
    console.log("整个动画已结束")
  },

  animateImg(){
    this.animate(
      '#img001',
      [
        { scale: [2, 2], rotate: 90 },
        { scale: [1, 1], rotate: 0, ease: 'ease-out' },
        { scale: [1.5, 1.5], rotate: 45, ease: 'ease-in'},
      ],
      5000,
      function(){
        console.log("动画执行完成")
        
        wx.showToast({
          title: "执行成功",
        })
      })
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
    this.setData({
      animation: "bg-color-hover"
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