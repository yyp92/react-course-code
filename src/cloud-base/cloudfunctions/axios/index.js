// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

// 使用当前云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 云函数入口函数
exports.main = async (event, context) => {
  /**
   * get请求
   */
  // const url = "https://news-at.zhihu.com/api/4/news/latest"
  // try {
  //   const res = await axios.get(url)
  //   return res.data; 
  // }
  // catch (e) {
  //   console.error(e);
  // }



  /**
   * 用于爬虫，爬取网页
   */
  // try {
  //   const res = await axios.get("https://baidu.com")
  //   const htmlString = res.data
  //   return htmlString.match(/<title[^>]*>([^<]+)<\/title>/)[1]  
  // }
  // catch (e) {
  //   console.error(e);
  // }



  /**
   * post请求
   */
  // const now = new Date(); //在云函数字符串时间时，注意要修改云函数的时区，方法在云函数实用工具库里有详细介绍
  // const month = now.getMonth()+1 //月份需要+1
  // const day = now.getDate()
  // const key = "" //你的聚合KEY
  // const url ="http://api.juheapi.com/japi/toh"

  // try {
  //   const res = await axios.post(url,{
  //     key:key,
  //     v:1.0,
  //     month:month,
  //     day:day
  //   })
  //   // const res = await axios.post(`url?key=${key}&v=1.0&month=${month}&day=${day}`)
  //   return res
  // } catch (e) {
  //   console.error(e);
  // }



  /**
   * 使用axios下载文件
   */
  try {
    const  url = 'https://tcb-1251009918.cos.ap-guangzhou.myqcloud.com/weapp.jpg';
    const res = await axios.get(url, {
      responseType: 'stream'
    })

    const buffer = res.data
    //我们也还可以将下载好的图片保存在云函数的临时文件夹里
    // const fileStream = await fs.createReadStream('/tmp/axiosimg.jpg')
    return await cloud.uploadFile({
      cloudPath: 'axiosimg.jpg',
      fileContent: buffer, 
    })
  } catch (e) {
    console.error(e);
  }
}