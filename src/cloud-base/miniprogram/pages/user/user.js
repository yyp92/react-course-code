// pages/user/user.js

// 在页面中连接数据库并查询数据示例
const db = wx.cloud.database()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 可以预填充一个用户未登陆的灰色图片
    avatarUrl: '',  
    // 预填充，提醒用户登录
    nickName: "用户未登陆",
    // 预填充
    city: "未知",  
    
    userData: {
      birth: "1995-01-01",
      region: ["广东省", "深圳市", "福田区"],
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: res => {
    //           let { avatarUrl, city, nickName } = res.userInfo

    //           this.setData({
    //             avatarUrl, city, nickName
    //           })

    //           // 可以添加到this.setData()的后面
    //           this.uploadMsg(avatarUrl, city, nickName)
    //         }
    //       })
    //     }
    //   }
    // });


    // 记录的创建
    const that = this
    const data = (await db.collection('user').where({
      _openid: '{openid}'
    }).get()).data
  
    console.log("获取到的用户信息",data)
    console.log(data.length)

    // 如果没有用户就创建记录
    // if (data.length === 0) { 
    //   db.collection('user').add({
    //     data: {
    //       // 一些数据可以从getUserInfo里获取并新增到数据库
    //     }
    //   })
    // }
  
    const userData = data[0]
    console.log(userData)

    // 将获取的用户数据使用setData赋值给data
    that.setData({ 
      // 将data里原有的userData对象和从数据库里取出来的userData对象合并，避免数据库里的userData为空时，setData会清空data里的userData值
      userData: Object.assign(that.data.userData, userData) 
    })
    console.log("userData的数据", this.data.userData)  
  },



  /**
   * 获取用户信息
   */
  getUserInfo: function (event) {
    console.log('getUserInfo打印的事件对象', event)

    // const { avatarUrl, city, nickName} = event.detail.userInfo
    // this.setData({
    //   avatarUrl,city, nickName
    // })



    // 获取用户高清头像
    let { avatarUrl, city, nickName} = event.detail.userInfo
    avatarUrl = avatarUrl.split("/")
    avatarUrl[avatarUrl.length - 1] = 0;
    avatarUrl = avatarUrl.join('/'); 

    this.setData({
      avatarUrl,city, nickName
    })

    // 可以添加到this.setData()的后面
    this.uploadMsg(avatarUrl, city, nickName)
  },

  /**
   * 上传用户信息
   */
  async uploadMsg(avatarUrl, city, nickName){
    const result = await db.collection('clouddisk').where({
      _openid: '{openid}'
    }).update({
      data: {
        avatarUrl,
        city,
        nickName
      }
    })
    console.log("更新结果", result)
  },

  /**
   * 获取表单数据
   */
  async formSubmit(e) {
    console.log('表单携带的事件对象', e)
    console.log('表单携带的数据为：', e.detail.value)

    const result = await db.collection('user')
      .where({
        // 获取用户在集合里的记录，只会有一条记录
        _openid: '{openid}'  
      })
      .update({
        data: e.detail.value
      })
      console.log(result)
  },
  birthChange(e){
    console.log("生日选择", e.detail.value)
    this.setData({
      "userData.birth": e.detail.value
    })

  },
  regionChange(e){
    console.log("地址选择", e.detail.value)
    this.setData({
      "userData.region": e.detail.value
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