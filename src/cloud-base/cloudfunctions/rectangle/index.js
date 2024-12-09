// 云函数入口文件
const cloud = require('wx-server-sdk')

// 使用当前云环境
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV 
})

// 云函数入口函数
exports.main = async (event, context) => {
  const {width, height} = event
  console.log("获取到的 width, height", [width, height])
  console.log("长方形的周长与面积",[(width + height) * 2, width * height])

  return {
    circum: (width + height) * 2,
    area: width * height
  }
}