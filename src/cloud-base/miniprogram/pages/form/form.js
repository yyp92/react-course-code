// pages/form/form.js

// 在页面中连接数据库并查询数据示例
const db = wx.cloud.database()

// 验证 validator
// const validator  = require('./../../miniprogram_npm/validator/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '你还没输入内容呢',

    initvalue: '填写内容复制',
    pasted: '这里会粘贴复制的内容',

    userData:{
      name: "李东bbsky",
      desc: "致力于互联网技术技能的普及",
      email: "344169902@qq.com" ,
      birth: "1995-01-01",
      region: ["广东省", "深圳市", "福田区"],  
    },

    R: 7,
    G: 193,
    B: 96,

    pickerdate: "2019-8-31",
  },

  /**
   * 剪切版
   */
  valueChanged(e) {
    this.setData({
      initvalue: e.detail.value
    })
  },
  copyText() {
    wx.setClipboardData({
      data: this.data.initvalue,
    })
  },
  pasteText() {
    const self = this
    wx.getClipboardData({
      success(res) {
        self.setData({
          pasted: res.data
        })
      }
    })
  },

  /**
   * 设置标题
   */
  buttonSetTitle(e) {
    // console.log(e)
    wx.setNavigationBarTitle({
      title: "button触发修改的标题"
    })
  },

  /**
   * 动态修改
   */
  setNaivgationBarTitle(e) {
    console.log(e)
    const navtitle = e.detail.value.navtitle
    wx.setNavigationBarTitle({
      title: navtitle
    })
  },

  /**
   * 提交多条数据
   */
  inputSubmit: function(e){
    console.log('提交的数据信息:',e.detail.value)
  },

  /**
   * 添加手机联系人
   */
  submitContact: function(e) {
    const formData = e.detail.value

    wx.addPhoneContact({
      ...formData,
      success() {
        wx.showToast({
          title: '联系人创建成功'
        })
      },
      fail() {
        wx.showToast({
          title: '联系人创建失败'
        })
      }
    })
  },

  /**
   * input绑定事件处理函数
   */
  bindKeyInput: function (e) {
    const inputValue = e.detail.value
    console.log('响应式渲染',e.detail)

    this.setData({
      inputValue
    })
  },

  /**
   * 表单组件的综合案例
   */
  formSubmit: function (e) {
    console.log('表单携带的数据为：', e.detail.value)

    const {
      switch1,
      process,
      textinput,
      sex,
      gamecheck
    } = e.detail.value || {}
  },
  formReset: function () {
    console.log('表单重置了')

    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  },

  /**
   * slider响应设置颜色
   */
  colorChanging(e) {
    console.log(e)
    let color = e.currentTarget.dataset.color
    let value = e.detail.value;

    this.setData({
      [color]: value
    })
  },

  /**
   * 获取picker组件的数据
   */
  bindDateChange: function (e) {
    console.log('picker组件的value', e.detail.value)
  },

  /**
   * picker组件的渲染
   */
  birthChange(e) {
    console.log("生日选择", e.detail.value)
    this.setData({
      "userData.birth": e.detail.value
    })

  },
  regionChange(e) {
    console.log("地址选择", e.detail.value)
    this.setData({
      "userData.region": e.detail.value
    })
  },





  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.setNavigationBarTitle({
      title: "onLoad触发修改的标题"
    })


    // 获取数据
    const that = this
    const data = (await db.collection('user').where({
      _openid: '{openid}'
    }).get()).data
  
    const userData = data[0]
    // 将获取的用户数据使用setData赋值给data
    that.setData({ 
      // 将data里原有的userData对象和从数据库里取出来的userData对象合并，避免数据库里的userData为空时，setData会清空data里的userData值
      userData: Object.assign(that.data.userData, userData) 
    })



    /**
     * 验证 validator
     */
    // 'foo@bar.com'是否是邮箱
    const v1 = validator.isEmail('foo@bar.com'); 
    // 18562347877是否是中国大陆的电话号码
    const v2 = validator.isMobilePhone('18562347877','zh-CN')
    console.log([v1, v2])
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