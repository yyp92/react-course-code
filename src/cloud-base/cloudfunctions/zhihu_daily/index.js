// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 注意这里不是wx.cloud.database()
const db = cloud.database()  

// 云函数入口函数
exports.main = async (event, context) => {
  const result = await db.collection('zhihu_daily')
    .get()
    
  return result
}