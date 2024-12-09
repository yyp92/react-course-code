// 云函数入口文件
const cloud = require('wx-server-sdk')

// 使用当前云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) 

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.ocr.printedText({
        imgUrl: 'https://tcb-1251009918.cos.ap-guangzhou.myqcloud.com/demo/ocrprint.png'
      })
    console.log(result)
    return result
  }
  catch (err) {
    console.log(err)
    return err
  }
}