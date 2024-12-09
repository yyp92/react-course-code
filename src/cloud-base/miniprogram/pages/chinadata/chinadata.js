// pages/chinadata/chinadata.js
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
    // 获取数据库的引用
    const db = wx.cloud.database()  
    // 获取数据库查询及更新操作符
    const _ = db.command  

    // 获取集合china的引用
    // db.collection("china")  
    //   // 查询的条件操作符where
    //   .where({ 
    //     // 查询筛选条件，gt表示字段需大于指定值。             
    //     gdp: _.gt(3000)     
    //   })
    //   // 显示哪些字段
    //   .field({ 
    //     // 默认显示_id，这个隐藏           
    //     _id: false,
    //     city: true,
    //     province: true,
    //     gdp: true
    //   })
    //   // 排序方式，降序排列
    //   .orderBy('gdp', 'desc')
    //   // 跳过多少个记录（常用于分页），0表示这里不跳过
    //   .skip(0)
    //   // 限制显示多少条记录，这里为10
    //   .limit(10)
    //   // 获取根据查询条件筛选后的集合数据                
    //   .get()                   
    //   .then(res => {
    //     console.log(res.data)
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })


    // count
    db.collection("china")
      .where({             
        gdp: _.gt(3000)    
      })
      .count().then(res => {
        console.log('count: ', res.total)
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