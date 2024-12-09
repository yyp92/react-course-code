// pages/daily/daily.js

// 注意这个要声明，建议放在Page()外，作为全局变量
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 添加数据
   */
  addDaily(){
    db.collection('zhihu_daily').add({
      data: {
        _id: "daily9718005",
        title: "元素，生生不息的宇宙诸子",
        images: ["https://pic4.zhimg.com/v2-3c5d866701650615f50ff4016b2f521b.jpg"],
        id: 9718005,
        url: "https://daily.zhihu.com/story/9718005",
        image: "https://pic2.zhimg.com/v2-c6a33965175cf81a1b6e2d0af633490d.jpg",
        share_url: "http://daily.zhihu.com/story/9718005",
        body: "<p><strong><strong>谨以此文，纪念元素周期表发布 150 周年。</strong></strong></p>rn<p>地球，世界，和生活在这里的芸芸众生从何而来，这是每个人都曾有意无意思考过的问题。</p>rn<p>科幻小说家道格拉斯·亚当斯给了一个无厘头的答案，42；宗教也给出了诸神创世的虚构场景；</p>rn<p>最为恢弘的画面，则是由科学给出的，另一个意义上的<strong>生死轮回，一场属于元素的生死轮回</strong>。</p>"
      }
    })
      .then(res => {
        console.log(res)
      })
      .catch(console.error)


    
    // 小程序端批量操作记录
    // .where({
    //   //'{openid}'就是指当前用户的openid，这是一个字符串常量，当后台发现该字符串时会自动替换为当前小程序用户的openid
    //   _openid:'{openid}',
    //   province:"湖北"
    // })
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