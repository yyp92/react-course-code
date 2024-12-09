// pages/folder/folder.js

// 在页面中连接数据库并查询数据示例
const db = wx.cloud.database()
const _ = db.command

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: [],
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{text: '取消'}, {text: '确定'}],
    oneButton: [{text: '确定'}],
    inputValue: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.checkUser()
    this.getFileData()
  },



  /**
   * 检查用户
   */
  async checkUser() {
    // 获取clouddisk是否有当前用户的数据，注意这里默认带了一个where({_openid:"当前用户的openid"})的条件
    const userData = (await db.collection('clouddisk').where({
      // 一定要开启安全规则，不开安全规则{openid}会失效，没有开启安全规则，数据库查询自带openid的权限，就不需要写这个条件了
      _openid: '{openid}' 
    }).get()).data
    console.log("当前用户的数据对象", userData)
  
    // 如果当前用户的数据data数组的长度为0，说明数据库里没有当前用户的数据
    if (userData.length === 0) {      
      // 没有当前用户的数据，那就新建一个数据框架，其中_id和_openid会自动生成
      await db.collection('clouddisk')
        .add({
          data:{
            // nickName和avatarUrl可以通过getUserInfo来获取，这里不多介绍
            "nickName": "", 
            "avatarUrl": "",
            "albums": [],
            "folders": []
          }
        })

      // wx.switchTab({
      //   // 如果数据库不存在用户，除了在数据库创建一条空记录以外，还跳转到user页面，尽管用户已经登录了，但是还需要借助button的open-type="getUserInfo"来获取用户的信息
      //   url: '/pages/user/user'
      // })
    }
    else {
      // 如果有数据，就做两件事情，一是使用setData提供页面渲染数据，二是将数据存储到全局对象
      this.setData({
        userData
      })
      app.globalData.userData = userData

      console.log('用户数据', userData)
    }
  },

  /**
   * 获取数据
   */
  getFileData() {
    const that = this
    // 获取clouddisk是否有当前用户的数据，注意这里默认带了一个where({_openid:"当前用户的openid"})的条件
    db.collection('clouddisk')
      .where({
        // 一定要开启安全规则，不开安全规则{openid}会失效，没有开启安全规则，数据库查询自带openid的权限，就不需要写这个条件了
        _openid: '{openid}', 
        _id: '97331e4564d335c9003ff67168375a31'
      })
      .get({
        success: function(res) {
          console.log("当前用户的数据对象", res)
          that.setData({userData: res.data})
          app.globalData.userData = res.data
        }
      })
  },

  /**
   * 添加数据
   */
  addFile() {
    db.collection('clouddisk').where({
      // 注意由于管理端（如云开发控制台）没有用户的登录态，所以不能使用'{openid}'，可以使用_id或填写自己的openid
      _openid: 'oUL-o9_Qg5b4Xnrh7vY0rhM5s_XddK8o' // 换成自己的openid
    })
    .update({
      data:{
        "albums": [
          {
            "albumName": "风景", 
            "photos": [ ]
          }
        ],
        "folders": [
          {
            "folderName": "工作周报",
            "files": []  // 空文件夹，只有文件夹名
          },
          {
            "folderName": "电子书", 
            "files": [{   // 有两个文件
              "name": "傲慢与偏见",  
              "fileID": "", 
              "comments": "中英双语版"
            },{
              "name": "史记",  
              "fileID": "",
              "comments": "史圣司马迁，二十四史之首"
            }]
          }
        ]
      }
    })
  },

  /**
   * 显示弹窗
   */
  showDialog() {
    this.setData({
      dialogShow: true
    })
  },

  /**
   * 输入框变化
   */
  keyInput(e) {
    this.setData({ inputValue: e.detail.value })
  },

  /**
   * 创建文件夹
   */
  async createFolder(e){
    const folderName = this.data.inputValue

    if (e.detail.index === 0) {
      this.setData({
        dialogShow: false
      })
    }
    else {
      this.setData({
        dialogShow: false
      })

      const result = await db.collection("clouddisk")
        .where({
          _openid: '{openid}'
        })
        .update({
          data: {
            folders: _.push([{"folderName": folderName, files: []}])
          }
        })
      console.log("数据更新结果", result)

      wx.reLaunch({
        url: 'pages/folder/folder'
      })
    }
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