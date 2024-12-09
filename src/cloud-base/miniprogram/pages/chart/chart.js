// pages/chart/chart.js

import * as echarts from '../../ec-canvas/echarts';
const app = getApp();

// 凡是写聚合都建议先声明这三个变量，后面也是如此，就不再多介绍了
const db = wx.cloud.database()
const _ = db.command
const $ = db.command.aggregate


/**
 * 小程序端
 */ 
// function initChart(canvas, width, height, dpr) {
//   const chart = echarts.init(canvas, null, {
//     width: width,
//     height: height,
//     devicePixelRatio: dpr // new
//   });
//   canvas.setChart(chart);

//   var option = {
//     backgroundColor: "#ffffff",
//     color: ["#37A2DA", "#32C5E9", "#67E0E3"],
//     series: [{
//       // 图表的名称
//       name: '业务指标', 
//       // 图表的类型
//       type: 'gauge', 
//       detail: {
//         formatter: '{value}%'
//       },

//       // 坐标
//       axisLine: {  
//         show: true,
//         lineStyle: {
//           width: 30,
//           shadowBlur: 0,
//           color: [
//             [0.3, '#67e0e3'],
//             [0.7, '#37a2da'],
//             [1, '#fd666d']
//           ]
//         }
//       },
//       data: [{
//         value: 40,
//         name: '完成率',
//       }]
//     }]
//   };

//   chart.setOption(option, true);
//   return chart;
// }



/**
 * 数据库
 */
// 集合名
const colName = "chart" 
// 记录的_id
const docId = "gauge001" 
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  db.collection(colName).where({
    _id:docId
  }).get().then(res => {
    const option = res.data[0]
    chart.setOption(option);
    
    return chart;
  })
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      // 调用initChart函数，获取返回的chart
      onInit: initChart 
    }
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