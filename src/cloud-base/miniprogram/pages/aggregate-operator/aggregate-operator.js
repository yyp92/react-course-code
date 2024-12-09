// pages/aggregate-operator/aggregate-operator.js

// 凡是写聚合都建议先声明这三个变量，后面也是如此，就不再多介绍了
const db = wx.cloud.database()
const _ = db.command
const $ = db.command.aggregate

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },



  /**
   * 算术操作符与整列处理
   */
  handleInit() {
    db.collection('user_achievement').aggregate()
      .project({
        _id: 1,
        name: 1,

        // sum是把每行的语数外分别相加
        sum: $.add(['$chinese', '$math', '$english'])
        // sum: $.add(['$chinese', 20])
      })
      .end()
      .then(res => {
        console.log('success', res.list)
      })
      .catch(e => {
        console.log('error', e)
      })
  },

  /**
   * 求总和与平均值
   */
  handleSumOrAvg() {
    db.collection("fruits").aggregate()
      .group({
        _id: null,
        // 水果的均价，
        avg:$.avg('$price'), 
        // 销售额  
        total: $.sum($.multiply(["$price", "$quantity"])) 
      })
      .end()
      .then(res => {
        console.log('success', res.list)
      })
      .catch(e => {
        console.log('error', e)
      })
  },

  /**
   * 查询分组里面的最大值和最小值
   */
  handleMaxOrMin() {
    db.collection("china").aggregate()
      .group({
        _id: "$province",
        maxgdp: $.max("$gdp"),
        minresident: $.min("$resident_pop")
      })
      .end()
      .then(res => {
        console.log('success', res.list)
      })
      .catch(e => {
        console.log('error', e)
      })
  },

  /**
   * 按条件排序后取第一个值和最后一个值
   */
  handleSort() {
    db.collection("china").aggregate()
      .sort({
        gdp: -1
      })
      .group({
        _id: "$province",
        maxgdp: $.first("$gdp"),
        city: $.first("$city")
      })
      .end()
      .then(res => {
        console.log('success', res.list)
      })
      .catch(e => {
        console.log('error', e)
      })
  },

  /**
   * 将整列字段值组成一个数组
   */
  async handleUnwind() {
    try {
      const res = await wx.cloud.callFunction({
        name: 'lookup'
      })
      
      console.log('----success: ', res?.result)
    }
    catch(e) {
      console.log('----error: ', e)
    }

    // 使用group分组来获取唯一值
    // db.collection("user").aggregate()
    //   .unwind("$bookList")
    //   .group({
    //     _id: "$bookList._id",
    //     books: $.push("$bookList")
    //   })
    //   .end()
    //   .then(res => console.log(res))
    //   .catch(err => console.error(err))
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