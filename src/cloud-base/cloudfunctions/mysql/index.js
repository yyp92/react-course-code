// 云函数入口文件
const cloud = require('wx-server-sdk')
const mysql = require('mysql2/promise');
const mysql = require('serverless-mysql')

// 使用当前云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) 

// 云函数入口函数
// exports.main = async (event, context) => {
//   try {
//     const connection = await mysql.createConnection({
//       // 内网ip地址
//       host: "10.168.0.7",
//       // 数据库的用户名 
//       user: "root", 
//       // 数据库密码 
//       password: "tcb123", 
//       // 数据库名称
//       database: "tcb",  
//     })

//     const [rows, fields] = await connection.query(
//       'SELECT * FROM `country` WHERE `country` = "china"',
//     );
    
//     // 注意要断开连接，不然尽管获取到了数据，云函数还是会报超时错误
//     connection.end(function(err) { 
//       console.log('断开连接')
//     });

//     console.log(rows)
//     console.log(fields)
//     return rows
//   }
//   catch (err) {
//     console.log("连接错误", err)
//     return err
//   }
// }

exports.main = async (event, context) => {
  const connection = await mysql({
    config: {
      host: "10.168.0.7",//你
      database: "country",
      user: "root",
      password: "lidongyx327"
    }
  })

  let results = await connection.query('INSERT INTO country(Country, Region) VALUES ("中国","亚洲")')
  await connection.end()
  
  return results
}