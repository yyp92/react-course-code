// 云函数入口文件
const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')

// 使用当前云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 云函数入口函数
/**
 * 在Node.js里，所有与文件操作都是通过fs核心模块来实现的，包括文件目录的创建、删除、查询以及文件的读取和写入，下面的createReadStream方法类似于读取文件；
 * path 模块提供了一些用于处理文件路径的API，比如下面的join方法用于连接路径；
 * __dirname 是指当前模块的目录名。
 */
exports.main = async (event, context) => {
  const fileStream = fs.createReadStream(path.join(__dirname + '/img/', '2.jpg'))
  
  return await cloud.uploadFile({
    cloudPath: 'tcb-2.jpg',
    fileContent: fileStream,
  })
}