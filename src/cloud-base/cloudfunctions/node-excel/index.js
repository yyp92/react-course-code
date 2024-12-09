// 云函数入口文件
const cloud = require('wx-server-sdk')

// const csv=require('csvtojson')
// const replace = require('replace-in-file');
// const fs = require('fs')
// const xlsx = require('node-xlsx');
const db = cloud.database()
const _ = db.command

// 使用当前云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) 

// 云函数入口函数
exports.main = async (event, context) => {
  /**
   * 读取云存储的Excel文件
   */
  // 你需要将该csv的地址替换成你的云存储的csv地址
  const fileID = 'cloud://cloud1-3gkiq8bd984d28e0.636c-cloud1-3gkiq8bd984d28e0-1319673306/china.csv' 
  const res = await cloud.downloadFile({
    fileID: fileID,
  })
  const buffer = await res.fileContent
  //解析下载后的Excel Buffer文件，sheets是一个对象，而sheets['data']是数组，Excel有多少行数据，这个数组里就有多少个数组；
  const sheets = await xlsx.parse(buffer);  
  //取出第一张表里的数组，注意这里的sheet为数组
  const sheet = sheets[0].data  
  const tasks = [] 

  // 如果你的Excel第一行为字段名的话，从第2行开始
  for (let rowIndex in sheet) { 
    let row = sheet[rowIndex];
    const task = await db.collection('chinaexcel')
    .add({
      data: {
        city: row[0], 
        province: row[1], 
        city_area: row[2], 
        builtup_area: row[3],
        reg_pop: row[4],
        resident_pop: row[5],
        gdp: row[6]
      }
    })

    // task是数据库add请求返回的值，包含数据添加之后的_id，以及是否添加成功
    tasks.push(task) 
  }

  return tasks



  /**
   * 将数据库里的数据保存为CSV
   */
  // const dataList = await db.collection("chinaexcel").where({
  //   _id:_.exists(true)
  // }).limit(1000).get()
  // const data = dataList.data  // data是获取到的数据数组，每一个数组都是一个key:value的对象
  // let sheet = [] // 其实最后就是把这个数组写入excel   
  // let title = ['id','builtup_area','city','city_area','gdp','province','reg_pop','resident_pop'] // 这是第一行
  // await sheet.push(title) // 添加完列名 下面就是添加真正的内容了
  // for(let rowIndex in data){ //
  //   let rowcontent = []  // 这是声明每一行的数据
  //   rowcontent.push(data[rowIndex]._id) // 注意下面这个与title里面的值的顺序对应
  //   rowcontent.push(data[rowIndex].builtup_area)
  //   rowcontent.push(data[rowIndex].city)
  //   rowcontent.push(data[rowIndex].city_area)
  //   rowcontent.push(data[rowIndex].gdp)
  //   rowcontent.push(data[rowIndex].province)
  //   rowcontent.push(data[rowIndex].reg_pop)
  //   rowcontent.push(data[rowIndex].resident_pop)
  //   await sheet.push(rowcontent) // 将每一行的字段添加到rowcontent里面
  // }
  // const buffer = await xlsx.build([{name: "china", data: sheet}])
  // return await cloud.uploadFile({
  //   cloudPath: 'china.xlsx',
  //   fileContent: buffer,
  // })



  /**
   * 将Excel文件一键转成云数据库的json文件
   */

}