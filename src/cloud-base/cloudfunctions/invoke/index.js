// 云函数入口文件
const cloud = require('wx-server-sdk')

// 使用当前云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 公共模块
const common = require('./common/common.js');
const {
  key,
  getName,
  validateNumber,
  indexOfAll
} = common

/**
 * 云函数入口函数
 * @param {*} event event对象指的是SDK触发云函数时传入的事件
 * @param {*} context context对象则包含此调用的调用信息和函数的运行状态
 */
exports.main = async (event, context) => {
  // console.log("event对象", event)
  // const {rectangle: {width, height}} = event
  // return {
  //   circum: (width + height) * 2,
  //   area: width * height
  // }


  
  // 不同调用方式下的event与context, 也会不同
  // console.log("event对象", event)
  // console.log("context对象", context)



  // cloud.getWXContext()可以获取到其中比较关键的信息，比如会返回小程序用户的openid、小程序appid、小程序用户的unionid等。
  // const wxContext = cloud.getWXContext()
  // console.log("wxContext对象", wxContext)
  // 打印如下：
  // { 
  //   // 用户的unionid，只有绑定了开放平台，且在用户授权（允许获取用户信息、关注、支付）的情况下才有
  //   UNIONID: '',
  //   // 小程序客户端的网络IPv4地址
  //   CLIENTIP: '10.22.213.71',
  //   // 小程序客户端的网络IPv6地址
  //   CLIENTIPV6: '::ffff:10.22.213.71',
  //   // 小程序AppID
  //   APPID: 'wxda99....b57046',
  //   // 小程序用户的openid
  //   OPENID: 'oUL-m5FuRmuVmxvbYOGuXbuEDsn8',
  //   // 环境
  //   ENV: 'xly-xrlur',
  //   // 云函数调用来源，wx_devtools开发者工具调用，wx_client小程序调用，wx_http	HTTP API 调用，wx_unknown	微信未知来源调用等
  //   SOURCE: 'wx_devtools'
  // }



  // 云开发环境的process.env
  /**
   * 环境变量的应用：
   * 可变值提取：我们可以把业务中有可能会变动的值提取至环境变量中，这样就能避免需要根据业务变更而修改云函数的代码了;
   * 加密信息外置：我们可以把认证、加密等敏感信息的key，从代码中提取至环境变量，就能避免key硬编码而引起的安全风险了；
   * 环境区分：针对不同开发阶段所要进行的配置和数据库信息，也可提取到环境变量中，这样仅需要修改环境变量的值，分别执行开发环境数据库和发布环境数据库即可；
   * 云开发环境的时区：云开发环境的默认时区为UTC+0，比北京时间UTC+8晚了8小时，配置函数的环境变量，设置TZ为Asia/Shanghai 即可。
   */
  // console.log("env环境变量", process.env)
  // const {
  //   SCF_RUNTIME,
  //   SCF_FUNCTIONVERSION,
  //   TENCENTCLOUD_APPID
  // } = process.env

  // console.log('===============', SCF_RUNTIME, SCF_FUNCTIONVERSION, TENCENTCLOUD_APPID)

  // return {
  //   SCF_RUNTIME,
  //   SCF_FUNCTIONVERSION,
  //   TENCENTCLOUD_APPID
  // }



  // 云函数的配置与进阶
  // const msg = "你好啊"
  // console.log(getName(msg)) 
  // console.log(key.AppID)
  // console.log(validateNumber(msg))
  // console.log(indexOfAll([1, 2, 3, 1, 2, 3], 1))



  // 云函数调用进阶
  console.log(event.action)
  // 根据调用云函数时传入的action的值来调用不同的函数
  switch (event.action) {
    case 'addPost': {
      return addPost(event)
    }

    case 'deletePost': {
      return deletePost(event)
    }

    case 'updatePost': {
      return updatePost(event)
    }

    case 'getPost': {
      return getPost(event)
    }

    default: {
      return 
    }
  }
}

// 这里只是返回一个字符串，可以换成其他的函数，比如在数据库里创建一篇文章
async function addPost(event) {
  return '创建一篇文章' 
}
async function deletePost(event) {
  return '删除一篇文章'
}
async function updatePost(event) {
  return '更新一篇文章'
}
async function getPost(event) {
  return '获取一篇文章'
}
