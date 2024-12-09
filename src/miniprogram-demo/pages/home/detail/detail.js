// pages/home/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [{
      name: "肖申克的救赎", 
      img:"https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.webp",
      desc:"有的人的羽翼是如此光辉，即使世界上最黑暗的牢狱，也无法长久地将他围困！"},
      {
        name: "霸王别姬",
        img: "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.webp",
        desc: "风华绝代。"
      },
      {
        name: "这个杀手不太冷",
        img: "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.webp",
        desc: "怪蜀黍和小萝莉不得不说的故事。"
      },
      {
        name: "阿甘正传",
        img: "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.webp",
        desc: "一部美国近现代史。"
      },
      {
        name: "美丽人生",
        img: "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.webp",
        desc: "最美的谎言。"
      },
      {
        name: "泰坦尼克号",
        img: "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.webp",
        desc: "失去的才是永恒的。"
      },
      {
        name: "千与千寻",
        img: "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.webp",
        desc: "最好的宫崎骏，最好的久石让。"
      },
      {
        name: "辛德勒名单",
        img: "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.webp",
        desc: "拯救一个人，就是拯救整个世界。"
      },     
    ],

  },

  // 跳转
  clickImage: function(event) {
    console.log('我是button', event)
    
    wx.navigateTo({
      url: "/pages/home/movieDetail/movieDetail?id=imageclick&uid=tcb&key=tap&ENV=weapp&frompage=lifecycle"
    })
  },
  clickView: function (event) {
    console.log('我是view',event)
    wx.navigateTo({
      url:"/pages/home/movieDetail/movieDetail?id=viewclick&uid=tcb&key=tap&ENV=weapp&frompage=lifecycle"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('=====', options)
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