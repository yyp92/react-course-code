// 云函数入口文件
const cloud = require('wx-server-sdk')

// 使用当前云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) 

// 云函数入口函数
exports.main = async (event, context) => {
  /**
   * wxacode.get
   */
  // const result = await cloud.openapi.wxacode.get({
  //   path: 'page/index/index?uid=1jigsdff',
  // })


  /**
   * wxacode.getUnlimited
   */
  const wxacodeResult = await cloud.openapi.wxacode.getUnlimited({
    // 只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~，不能有空格之类的其他字符
    scene: 'uid=1jigsdff', 
    // 注意这个必须是已经发布的小程序存在的页面（否则报错），根路径前不要填加 /,不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面；但是你要填写就不要写错路径
    page: 'page/index/index',  
  })

  const uploadResult = await cloud.uploadFile({
    cloudPath: `wxacode.jpg`,
    fileContent: wxacodeResult.buffer,
  })

  return uploadResult.fileID
}