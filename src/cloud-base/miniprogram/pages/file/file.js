// pages/file/file.js

const util = require('../../utils/util.js')

//在file.js生命周期函数onLoad的options，我们可以提取链接携带的index
const app = getApp()
// 在页面中连接数据库并查询数据示例
const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 单张图片
    imgurl: '',
    // 是否显示图片
    hasImg: false,

    // 多张图片
    imgurlList: [],

    // 多张图片
    tempFiles: [],

    // 地理信息
    location: {},

    // 下载文件
    downloadFile: "",

    tempFilePath: '',
    savedFilePath: '',

    logs: [],

    folderIndex: null,
    folderData: [],

    files: [],
  },


  /**
   * 选择单张图片
   */
  chooseImg() {
    const that=this
    wx.chooseImage({
      // 可以选择的照片数量，默认为9张（由于imgurl声明的是字符串，多张照片需为数组Array，后面有上传多张图片的案例）
      count: 1,

      // 所选的图片的尺寸，original为原图，compressed为压缩图，为了减轻服务器压力，建议为压缩图；
      sizeType: ['original', 'compressed'],

      // 选择图片的来源，album就是图片可以来自手机相册；而camera是可以来自手机拍照，两个都写就是来自相册或拍照都可以；
      sourceType: ['album', 'camera'],

      // tempFilePaths为临时文件的路径列表
      // tempFilePaths: [],

      // tempFiles为临时文件列表
      // tempFiles: [],

      success(res) {
        const imgurl = res.tempFilePaths

        that.setData({
          imgurl,
          hasImg: !!imgurl
        })

        // 获取图片信息
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          // 也可以这么写：src: that.data.imgurl[0],这里只能看到第一张照片的信息，其他照片的信息需要遍历来获取
          success(res){
            console.log('getImageInfo回调打印的res', res)
          }
        })
      }
    })
  },

   /**
   * 选择多张图片
   */
  chooseImgs() {
    const that=this
    wx.chooseImage({
      // 可以选择的照片数量，默认为9张（由于imgurl声明的是字符串，多张照片需为数组Array，后面有上传多张图片的案例）
      count: 9,

      // 所选的图片的尺寸，original为原图，compressed为压缩图，为了减轻服务器压力，建议为压缩图；
      sizeType: ['original', 'compressed'],

      // 选择图片的来源，album就是图片可以来自手机相册；而camera是可以来自手机拍照，两个都写就是来自相册或拍照都可以；
      sourceType: ['album', 'camera'],

      // tempFilePaths为临时文件的路径列表
      // tempFilePaths: [],

      // tempFiles为临时文件列表
      // tempFiles: [],

      success(res) {
        const imgurlList = res.tempFilePaths

        that.setData({
          imgurlList
        })
      }
    })
  },

  /**
   * 预览照片
   */
  previewImg() {
    wx.previewImage({
      current: '',
      urls: this.data.imgurl,
    })
  },

  /**
   * 预览照片
   */
  previewImgs(e) {
    // 点击哪张预览哪张
    const index = e.currentTarget.dataset.index

    wx.previewImage({
      current: this.data.imgurlList[index],
      urls: this.data.imgurlList,
    })
  },

  /**
   * 保存图片
   */
  handleSaveImg(e) {
    wx.saveImageToPhotosAlbum({
      filePath: "/images/background.jpg",
      success(res) { 
        wx.showToast({
          title: '保存成功',
        })
      }
    })
  },

  /**
   * 上传文件到小程序本地
   */
  chooseFile() {
    let that = this
    wx.chooseMessageFile({
      // 最多可以选择的文件个数，可以 0～100
      count: 5,

      // 所选的文件的类型
      /**
       * all	从所有文件选择
       * video	只能选择视频文件
       * image	只能选择图片文件
       * file	可以选择除了图片和视频之外的其它的文件
       */
      type: 'file',

      // 根据文件拓展名过滤，仅 type==file 时有效。每一项都不能是空字符串。默认不过滤。
      // extension: [],

      // 接口调用成功的回调函数
      success(res) {
        // console.log('上传文件的回调函数返回值', res)

        that.setData({
          tempFiles: res.tempFiles
        })
      }
    })
  },

  /**
   * 选择地理位置
   */
  chooseLocation() {
    let that = this

    wx.chooseLocation({
      success: function(res) {
        const location = res

        that.setData({
          location
        })
      },
      fail:function(res){
        console.log("获取位置失败")
      }
    })
  },

  /**
   * 下载文件
   */
  downloadFile() {
    const that = this

    // wx.downloadFile({
    //   // 链接可以替换为你的云存储里面的下载地址
    //   url: 'https://636c-cloud1-3gkiq8bd984d28e0-1319673306.tcb.qcloud.la/miniprogram-demo/weapp.jpg?sign=79825e84d8f54f28d9ee9d765a822032&t=1691130306', 
    //   success (res) {
    //     console.log("成功回调之后的res对象",res)

    //     // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
    //     // 如果网络请求成功
    //     if (res.statusCode === 200) {
    //       that.setData({
    //         downloadFile: res.tempFilePath
    //       })
    //     }
    //   }
    // })


    const downloadTask = wx.downloadFile({
      // 在小程序里下载文件也就是请求外部链接是需要域名校验的，如果使用云开发来下载云存储里面的文件，就不会有域名校验备案的问题
      url: 'https://636c-cloud1-3gkiq8bd984d28e0-1319673306.tcb.qcloud.la/miniprogram-demo/weapp.jpg?sign=79825e84d8f54f28d9ee9d765a822032&t=1691130306', 
      success (res) {
        if (res.statusCode === 200) {
          that.setData({
            downloadFile:res.tempFilePath
          })
        }
      }
    })
  
    downloadTask.onProgressUpdate((res) => {
      console.log('下载进度', res.progress)
      console.log('已经下载的数据长度', res.totalBytesWritten)
      console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    })
  },

  /**
   * 下载并打开文档
   */
  openDoc() {
    wx.downloadFile({
      // 链接可以替换为云存储里面的下载地址，文档格式需要是pdf、word、excel、ppt
      url: 'https://636c-cloud1-3gkiq8bd984d28e0-1319673306.tcb.qcloud.la/miniprogram-demo/fe-pdf-test.pdf?sign=92b811a0468e6ad858e553cd0a96723d&t=1691484855', 
      success (res) {
        console.log("成功回调之后的res对象", res)

        if (res.statusCode === 200) {
          wx.openDocument({
            filePath: res.tempFilePath,
            success: function (res) {
              console.log('打开文档成功')
            },
            fail: function(err){
              console.log(err)
            }
          })
        }
      }
    })
  },

  /**
   * 保存文件与文件缓存
   */
  downloadPDF() {
    const that = this
    wx.downloadFile({
      // 链接可以替换为云存储里面的下载地址，文档格式需要是pdf、word、excel、ppt
      url: 'https://636c-cloud1-3gkiq8bd984d28e0-1319673306.tcb.qcloud.la/miniprogram-demo/fe-pdf-test.pdf?sign=92b811a0468e6ad858e553cd0a96723d&t=1691484855', 
      success (res) {
        console.log("成功回调之后的res对象", res)
        if (res.statusCode === 200) {
          wx.saveFile({
            tempFilePath: res.tempFilePath,
            success (res) {
              console.log('saveFile', res)
              that.setData({
                savedFilePath: res.savedFilePath
              })

            }
          })
        }
      }
    })
  },
  openPDF1() {
    const that = this
    wx.openDocument({
      filePath: that.data.savedFilePath,
      success: function (res) {
        console.log('打开文档成功')
      },
      fail: function(err){
        console.log(err)
      }
    })
  },

  /**
   * 获取已保存的缓存文件列表
   */
  getSavedFileList() {
    wx.getSavedFileList({
      success (res) {
        console.log('获取已保存的缓存文件列表', res.fileList)
      }
    })
  },

  /**
   * 获取缓存文件的信息
   */
  getSavedFileInfo() {
    wx.getSavedFileInfo({
      // 这是开发者工具的缓存文件的路径，要换成自己的哦
      filePath: "http://store/6PUteSRC8WRVd8e43094a92db5e4b69a4ec38bc82d66.pdf",

      success(res){
        console.log('获取缓存文件的信息', res)
      }
    })
  },

  /**
   * 文件管理器与用户目录
   */
  getFileSystemManager() {
    const fs =  wx.getFileSystemManager()

    console.log('getFileSystemManager: ', fs, wx.env)
  },

  /**
   * 使用文件管理器写入并读取文件
   */
  getFileSystemManager1() {
    const fs =  wx.getFileSystemManager()

    // 使用文件管理器创建一个文件夹
    fs.mkdir({
      dirPath: wx.env.USER_DATA_PATH + "/cloudbase",
      success(res){
        console.log('使用文件管理器创建一个文件夹', res)
      },
      fail(err){
        console.log(err)
      }            
    })

    // 读取文件夹下有哪些文件，会返回文件夹内文件列表
    fs.readdir({
      dirPath: wx.env.USER_DATA_PATH,
      success(res){
        console.log('readdir', res)
      },
      fail(err){
        console.log(err)
      }  
    })

    // 新建一个文本文件test，并往文件里写入数据
    fs.writeFile({
      filePath: wx.env.USER_DATA_PATH + "/cloudbase" + "/test",
      data: "云开发技术训练营",
      encoding: "utf8",
      success(res){
        console.log('writeFile', res)
      }
    })

    // 往之前建好的test文本文件里，新增一些内容
    fs.appendFile({
      filePath: wx.env.USER_DATA_PATH + "/cloudbase" + "/test",
      data: "CloudBase Camp",
      encoding: "utf8",
      success(res) {
        console.log('appendFile', res)
      }
    })

    // 读取test文本文件里的内容
    fs.readFile({
      filePath: wx.env.USER_DATA_PATH + "/cloudbase" + "/test",
      encoding: "utf-8",
      success(res) {
        console.log('readFile1', res)
      }
    })
  },

  /**
   * 将图片存储到缓存里
   */
  chooseImage2() {
    const that = this

    wx.chooseImage({
      count: 1,
      success(res) {
        that.setData({
          tempFilePath: res.tempFilePaths[0]
        })
      }
    })
  },
  saveImage() {
    const that = this

    wx.saveFile({
      tempFilePath: this.data.tempFilePath,
      success(res) {
        that.setData({
          savedFilePath: res.savedFilePath
        })
        wx.setStorageSync('savedFilePath', res.savedFilePath)
      },
    })
  },

  /**
   * 选择文件
   */
  handleChooseMessageFile() {
    const files = this.data.files
    const that = this

    wx.chooseMessageFile({
      count: 5,
      success: res => {
        console.log('选择文件之后的res', res)
        let tempFilePaths = res.tempFiles
        for (const tempFilePath of tempFilePaths) {
          files.push({
            src: tempFilePath.path,
            name: tempFilePath.name
          })
        }
        that.setData({ files: files })
        console.log('选择文件之后的files', this.data.files)
      }
    })
  },

  /**
   * 上传文件
   */
  uploadFiles(e) {
    const filePath = this.data.files[0].src
    const cloudPath = `cloudbase/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}` + filePath.match(/.[^.]+?$/)

    wx.cloud.uploadFile({   
      cloudPath,
      filePath
    })
    .then(res => {
      this.setData({
        fileID: res.fileID
      }) 
      
      this.addFiles(res.fileID)
    })
    .catch(error => {
      console.log("文件上传失败", error)
    })
  },

  /**
   * 
   */
  addFiles(fileID) {
    const name = this.data.files[0].name
    const _id = app.globalData.userData[0]._id
    
    db.collection('clouddisk').where({
      _openid: '{openid}',
      _id: _id
    }).update({
      data: {
        'folders.0.files': _.push({
          "name": name,
          "fileID": fileID
        })
      },
      _openid: '{openid}'
    })
    .then(result => {
      console.log("写入成功", result)
      wx.navigateBack()
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      savedFilePath: wx.getStorageSync('savedFilePath')
    })

    // console.log('未格式化的时间', new Date())
    // console.log('格式化后的时间', util.formatTime(new Date()))
    // console.log('格式化后的数值', util.formatNumber(9))

    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })



    /**
     * 照片和文件管理
     */
    // 将获取到的index赋值给folderIndex
    this.setData({  
      // 将字符串转为Number类型
      folderIndex: parseInt(options.index),  
    })

    const index = parseInt(options.index) 
    // 根据获取到的index，将指定（该index）的folders数据赋值给folerData
    this.setData({  
      folderData: app.globalData.userData[0].folders[index]
    })
    console.log("赋值了一个啥", this.data.folderData)
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