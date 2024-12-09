// pages/aggregate/aggregate.js

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
   * match匹配
   */
  handleMatch() {
    db.collection('china').aggregate()
      .match({
        gdp: _.gt(3000) 
      })
      .project({
        // 不显示_id字段
        _id: 0 
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
   * project投射
   */
  handleProject() {
    db.collection('china').aggregate()
      .project({
        // 用0或false来去掉_id字段，_id就不会显示啦
        _id :0,  
        // 用1或true来
        city: 1, 
        gdp: 1,
        "常住人口": '$reg_pop',
        "人均GDP": $.divide([$.multiply(['$gdp', 10000]), '$reg_pop'])
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
   * group分组
   */
  handleGroup() {
    db.collection('user_achievement').aggregate()
      .group({
        // 按性别来分组，相当于去重，或者获取唯一值
        _id: '$gender',
        // 男生、女生的语文总分分别是多少
        chinese: $.sum('$chinese'), 
        // 男生、女生的数学平均分分别是多少
        mathavg: $.avg('$math'),
        // 男生、女生的英语最高分分别是多少
        engmax: $.max('$english'), 
        // 这个是count聚合阶段，后面也会有介绍，指的是男生、女生各有多少人
        count: $.sum(1)
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
   * count计算
   */
  handleCount() {
    db.collection('china').aggregate()
      .match({
        gdp: _.gt(3000)
      })
      .group({
        _id: null,
        count: $.sum(1)
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
   * unwind拆分数组
   */
  handleUnwind() {
    db.collection('user_books').aggregate()
      .unwind({
        path: '$books', 
        // 拆分时还可以通过设置includeArrayIndex保留数组元素的索引            
        includeArrayIndex: 'index',
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
   * replaceRoot指定根节点
   */
  handleReplaceRoot() {
    db.collection('user_books').aggregate()
      .unwind({
        path: '$books',
        includeArrayIndex: 'index'
      })
      // 输入文档有的没有books对象这个字段，那你需要在replaceRoot前将这些文档给过滤掉才行
      // .match({
      //   books:_.exist(true)
      // })
      .replaceRoot({
        // 将books里面的数据提取出来，成为根节点
        newRoot: '$books' 
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
   * 简单的排名案例
   */
  handleSort() {
    // db.collection('user').aggregate()
    //   .sort({
    //     // 降序，
    //     chinese: -1  
    //   })
    //   .group({
    //     _id:null,
    //     // $$ROOT是指代表aggregate当前阶段的聚合结果中，对每一条记录的整条记录进行操作。
    //     users:$.push('$$ROOT') 
    //   })
    //   .unwind({
    //     path: '$users',
    //     // 将数组的index提取到rank字段
    //     includeArrayIndex: 'rank' 
    //   })
    //   .project({
    //     _id:0,
    //     users:'$users',
    //     rank:$.add(['$rank', 1]),
    //   })
    //   .addFields({
    //     // 将rank排名写进users对象
    //     'users.rank':'$rank',  
    //   })
    //   .match({
    //     // 根据用户id查相应的数据
    //     "users._id":"user001" 
    //     //"rank":3   通过这个条件可以根据排名查对应的用户   
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