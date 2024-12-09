// 云函数入口文件
const cloud = require('wx-server-sdk')
const moment = require("moment");
const moment1 = require('moment-timezone');
const ipify = require('ipify');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  moment.locale('zh-cn');
  time1 = moment().format('MMMM Do YYYY, h:mm:ss a');
  time2 = moment().startOf('hour').fromNow();
  time3 = moment1().tz('Asia/Shanghai').format('MMMM Do YYYY, h:mm:ss a');

  // return  { time1, time2, time3}

  // await ipify({ useIPv6: false })

  return  { time1, time2, time3}
}