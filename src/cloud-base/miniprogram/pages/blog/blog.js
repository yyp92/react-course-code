// pages/blog/blog.js

const app = getApp()
// 凡是写聚合都建议先声明这三个变量，后面也是如此，就不再多介绍了
const db = wx.cloud.database()
const _ = db.command
const $ = db.command.aggregate

Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogData: {},
  },



  /**
   * 获取数据
   */
  async getData(){
    const blogData = (await wx.cloud.callFunction({
      name: "blog_getdata"
    })).result
    // console.log('---blogData', blogData)

    this.setData({
      blogData
    })

    // 获取一次数据链路这么长、还用到了云函数，为了让查看文章详情时不再浪费性能，所以把博客的数据存储到globalData，减少云函数以及数据库的调用次数
    app.globalData.blogData = blogData 
  },

  /**
   * 点赞
   */
  async addStar(e) {
    const id = e.currentTarget.dataset.id
    const blog = this.data.blogData
    // await blog.filter(post => {
    //   if (post.id == id) {
    //     post.addStar = true
    //     // 由于stars字段并没有预先写在记录里，所以可能为undefined，
    //     let stars = post.stars || 0
    //     post.stars = stars + 1
    //   }
    // })

    //修改前面的addStar事件处理函数
    await blog.filter(post => {
      if (post.id == id) {
        post.addStar = true
        let stars = post.stars || 0 
        post.stars = stars + 1
        let star = post.star || false
        post.star = !star
      }
    })

    this.setData({
      blogData: blog
    })
  },

  /**
   * 收藏
   */
  async addFavor(e) {
    const id = e.currentTarget.dataset.id

     // 更新收藏数字段
    await db.collection('post')
      .where({
        id: id
      })
      .update({
        data: {
          favorites: _.inc(1)
        }
      })
  
    // 更新用户收藏了哪些文章的id
    await db.collection('user')
      .where({
        _openid: '{openid}'
      })
      .update({
        data: {
          favorites: _.push(id)
        }
      })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.getData()
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