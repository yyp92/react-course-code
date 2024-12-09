// pages/home/data/data.js
let lesson = "云开发技术训练营";
let enname = "CloudBase Camp";
let x = 3, y = 4, z = 5.001, a = -3, b = -4, c = -5;
let now = new Date();

let initData = '只有一行原始数据'
let extraLine = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    charat: lesson.charAt(4),
    concat: enname.concat(lesson),
    uppercase: enname.toUpperCase(),
    abs: Math.abs(b),
    pow: Math.pow(x, y),
    sign: Math.sign(a),
    now: now.toString(),
    fullyear: now.getFullYear(),
    date: now.getDate(),
    day: now.getDay(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    time: now.getTime(),

    bgcolor:"#000000",

    muted: true,

    text: initData,

    tabs: ["北京", "上海", "广州", "深圳"],
    activeIndex:0,
  },

  /**
   * 响应的数据绑定
   */
  redTap:function(){
    this.setData({
      bgcolor: "#cd584a"
    })
  },
  yellowTap:function(){
    this.setData({
      bgcolor: "#f8ce5f"
    })
  },

  /**
   * 响应的布尔操作
   */
  changeMuted: function (e) {
    this.setData({
      muted: !this.data.muted
    })
  },

  /**
   * 响应的数组操作
   */
  addLine: function (e) {
    extraLine.push('新增的内容')
    this.setData({
      text: initData + '\n' + extraLine.join('\n')
    })
  },
  removeLine: function (e) {
    if (extraLine.length > 0) {
      extraLine.pop()
      this.setData({
        text: initData + '\n' + extraLine.join('\n')
      })
    }
  },

  /**
   * currentTarget事件对象
   */
  tabClick: function (e) {
    console.log(e)
    this.setData({
      activeIndex: e.currentTarget.id
    });
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
})