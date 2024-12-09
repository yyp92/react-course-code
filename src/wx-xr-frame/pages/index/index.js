// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    width: 300,
    height: 300,
    renderWidth: 300,
    renderHeight: 300,
    pos: [0, 0]
  },
  onLoad() {
    const info = wx.getSystemInfoSync()
    const width = info.windowWidth;
    const height = info.windowHeight;
    const dpi = info.pixelRatio;

    this.setData({
      width,
      height,
      renderHeight: height * dpi,
      renderWidth: width * dpi
    })
  },
  handleMikuPos(event) {
    // console.log("组件通讯传递的数据", event.detail)
    this.setData({
      pos: event.detail
    })
  }
})
