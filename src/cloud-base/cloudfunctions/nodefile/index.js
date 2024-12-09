const config = require('./config/config.js')
const {AppID, AppKey} = config

const fs = require('fs')
const path = require('path')

// 云函数入口文件
const cloud = require('wx-server-sdk')

// 使用当前云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) 

// 云函数入口函数
exports.main = async (event, context) => {
  // console.log('当前执行文件的文件名', __filename );
  // console.log('当前执行文件的目录名', __dirname );


  // console.log('config', AppID, AppKey );


  // process可以不必使用require就可以直接用
  // return process.env 


  // const fileStream = fs.createReadStream(path.join(__dirname, './assets/demo.jpg'))
  // return await cloud.uploadFile({
  //   cloudPath: 'demo.jpg',
  //   fileContent: fileStream,
  // })


  // const funFolder = '.';//.表示当前目录
  // fs.readdir(funFolder, (err, files) => {
  //   files.forEach(file => {
  //     console.log(file);
  //   });
  // });



  // 创建一个文件
  const text = "云开发技术训练营CloudBase Camp. ";
  // 将文件写入到临时磁盘空间
  await fs.writeFile("/tmp/tcb.txt", text, 'utf8', (err) => { 
    if (err) console.log(err);
    console.log("成功写入文件.");
  });

  // 将创建的txt文件上传到云存储
  const fileStream = await fs.createReadStream('/tmp/tcb.txt')
  return await cloud.uploadFile({
    cloudPath: 'tcb.txt',
    fileContent: fileStream,
  })
}