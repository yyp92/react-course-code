// 云函数入口文件
const cloud = require('wx-server-sdk')

// 使用当前云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) 

// 云函数入口函数
exports.main = async (event, context) => {
  // 换成你云存储内的一张图片的fileID，图片不能过大
  const fileID = 'cloud://cloud1-3gkiq8bd984d28e0.636c-cloud1-3gkiq8bd984d28e0-1319673306/demo.jpg' 
  const res = await cloud.downloadFile({
    fileID: fileID,
  })
  console.log('-----res', res)
  const buffer = res.fileContent

  return buffer.toString('base64')
}