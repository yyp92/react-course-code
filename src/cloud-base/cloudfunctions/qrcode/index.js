// 云函数入口文件
const cloud = require('wx-server-sdk')

const fs = require('fs')
const QRCode = require('qrcode')


// 使用当前云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) 


// 云函数入口函数
exports.main = async (event, context) => {
  // text为二维码里包含的内容，将创建的二维码图片先存储到/tmp临时文件夹里，命名为qrcode.png
  const text="二维码里的有腾讯云云开发"
  await QRCode.toFile(
    '/tmp/qrcode.png',
    text,
    {
      color: {
        dark: '#00F',  // 蓝点
        light: '#0000' // 透明底
      }
    },
    function (err) {
      if (err) throw err
      console.log('done')
    }
  )

  // 读取存储到/tmp临时文件夹里的二维码图片并上传到云存储里，返回fileID到小程序端
  const fileStream = await fs.createReadStream('/tmp/qrcode.png')
  return await cloud.uploadFile({
    cloudPath: 'qrcode.jpg',
    fileContent: fileStream,
  }) 
}