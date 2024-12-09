// 云函数入口文件
const cloud = require('wx-server-sdk')
var _ = require('lodash');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
 // 将数组拆分为长度为2的数组
 const arr= _.chunk(['a', 'b', 'c', 'd'], 2);

 return arr
}