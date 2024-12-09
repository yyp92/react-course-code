// 云函数入口文件
const cloud = require('wx-server-sdk')

// 使用当前云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) 

const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  const data = (
    await db.collection('post').aggregate()
      .lookup({
        from: 'collect',
        localField: 'collect',
        foreignField: '_id',
        as: 'category',
      })
      // 数量取决于你对功能的权衡，limit的值如果太小，就可能需要多次调用云函数，浪费资源；如果值太大，一次请求的数据如果太多，首页加载会变慢。
      .limit(50) 
      .end()
  ).list

  return data
}