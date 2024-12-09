// 云函数入口文件
const cloud = require('wx-server-sdk')

 // 使用当前云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database() 

// 云函数入口函数
exports.main = async (event, context) => {
  const result = await db.collection('china')
    .add({
      data: [
        {
          _id:"user001",
          name:"小明1"
        },
        {
          _id:"user002",
          name:"小明2"
        }
      ]
    })

  return result
}