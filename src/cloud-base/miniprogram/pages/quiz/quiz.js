// pages/quiz/quiz.js

const db = wx.cloud.database()
const _ = db.command


Page({

  /**
   * 页面的初始数据
   */
  data: {
    quiz: {}
  },



  /**
   * 获取数据
   */
  async getQuiz() {
    const quiz = (await db.collection('quiz').where({
      id: "quiz-001",
      // _openid: '{openid}'
    }).get()).data[0]

    this.setData({
      quiz
    })
    console.log(this.data.quiz, quiz)
  },

  // 提交
  //将用户提交的数据传递给云函数，让云函数来处理，大家可以自行去写这个quiz的云函数
async formSubmit(e){
  const quiz = e.detail.value 
  console.log("用户提交的数据", quiz)
  // wx.cloud.callFunction({
  //   name: "quiz",
  //   data: quiz
  // }).then(res => {console.log(res)})
},



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getQuiz()
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