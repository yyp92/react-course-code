// pages/cloudFile/cloudFile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: '',
  },



  /**
   * 选择并上传图片
   */
  chooseImg() {
    const that = this

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log("上传文件的临时路径列表", res.tempFilePaths)

        // 上传第一张图片
        const filePath = res.tempFilePaths[0] 
        const cloudPath = `${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}` + filePath.match(/.[^.]+?$/)[0]

        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('上传成功后获得的res：', res)

            that.setData({
              imgurl: res.fileID
            })
          },
          fail: err => {
            console.log(err)
          }
        })
      }
    })
  },

  /**
   * 下载和删除云存储里的文件
   */
  downloadFile() {
    wx.cloud.downloadFile({
      // 换成自己云存储里的fileID
      fileID: 'cloud://cloud1-3gkiq8bd984d28e0.636c-cloud1-3gkiq8bd984d28e0-1319673306/miniprogram-demo/excel.xlsx' 
    })
    .then(res => {
      console.log('下载', res.tempFilePath)
    }).catch(error => {
      console.log(error)
    })
  },
  deleteFile() {
    wx.cloud.deleteFile({
      // 换成自己云存储里的fileID
      fileList: ['cloud://cloud1-3gkiq8bd984d28e0.636c-cloud1-3gkiq8bd984d28e0-1319673306/miniprogram-demo/excel.xlsx'],
    })
    .then(res => {
      console.log('删除', res.fileList)
    }).catch(error => {
      console.log(error)
    })
  },

  /**
   * 云函数上传图片
   */
  handleCloudUploadFile() {
    wx.cloud.callFunction({
      name: 'uploadimg',
      success: res => {
        console.log('callFunction-uploadimg', res)

        // 获取https链接
        wx.cloud.getTempFileURL({
          fileList: [res.result.fileID],
        })
        .then((res) => {
          console.log('https: ', res.fileList);
        });
      }
    })
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