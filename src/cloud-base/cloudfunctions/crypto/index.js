// 云函数入口文件
const cloud = require('wx-server-sdk')
const crypto = require('crypto');

// 使用当前云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) 

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取crypto支持的加密算法种类列表
  const hashes = crypto.getHashes(); 

  // md5 加密 CloudBase2020 返回十六进制
  var md5 = crypto.createHash('md5');
  var message = 'CloudBase2020';
  var digest = md5.update(message, 'utf8').digest('hex');   

  return {
      "crypto支持的加密算法种类": hashes,
      "md5加密返回的十六进制": digest
  };
}