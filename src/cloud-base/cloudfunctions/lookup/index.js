// 云函数入口文件
const cloud = require('wx-server-sdk')

 // 使用当前云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()
const _ = db.command  
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  // 这里是以user集合为主集合
  const res = await db.collection('user_files').aggregate() 
    .lookup({
      // 要连接的集合名称
      from: 'user_files_list',  
      // 相对于user_files集合而言，file就是本地字段
      localField: 'file',
      // 相对于user_files集合而言，user_files_list集合的_id就是外部字段  
      foreignField: '_id', 
      // 指定匹配之后的数据存放在哪个字段 
      as: 'bookList',  
    })
    .end()

  console.log('success', res.list)
  return res.list
}