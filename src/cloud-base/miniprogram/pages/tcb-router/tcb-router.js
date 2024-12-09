// pages/tcb-router/tcb-router.js
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
    wx.cloud.callFunction({
      name: 'router',
      data: {
        // 路由为字符串user，注意属性为 $url 
        $url: "user", 
      }
    }).then(res => {
        console.log(res)
    })


    // 新增一条记录
    wx.cloud.callFunction({
      name: 'router', //router云函数
      data: {
      $url: "add",
      adddata:{
        id:"202006031020",
        title:"云数据库的最佳实践",
        content:"<p>文章的富文本内容</p>",
        createTime:Date.now()
        }
      }
    }).then(res => {
      console.log(res)
    })

    // 删除一条记录
    wx.cloud.callFunction({
      name: 'router',
      data: {
        $url:"delete",
        deleteid:"202006031020"
      }
    }).then(res => {
      console.log(res)
    })

    // 查询记录
    wx.cloud.callFunction({
      name: 'router',
      data: {
        $url:"get",
        querydata:{
          id:"202006031020",
        }
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