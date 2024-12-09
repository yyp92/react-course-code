// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const nodemailer = require("nodemailer");
  let transporter = nodemailer.createTransport({
    // SMTP服务器地址
    host: "smtp.qq.com", 
    // 端口号，通常为465，587，25，不同的邮件客户端端口号可能不一样
    port: 465, 
    // 如果端口是465，就为true;如果是587、25，就填false
    secure: true, 
    auth: {
      // 你的邮箱账号
      user: "3441****02@qq.com",  
      // 邮箱密码，QQ的需要是独立授权码，不是QQ邮箱的密码
      pass: "你的QQ邮箱授权码"   
    }
  });
 
  let message = {
    // 你的发件邮箱
    from: '来自*** <888888@qq.com>',   
    // 你要发给谁
    to: '你要发送给谁', 
    // cc:'',  支持cc 抄送
    // bcc: '', 支持bcc 密送
    subject: '欢迎大家参与云开发技术训练营活动',
 
    // 支持text纯文字，html代码
    text: '欢迎大家',
    html:
      '<p><b>你好：</b><img src="https://hackwork-1251009918.cos.ap-shanghai.myqcloud.com/handbook/html5/weapp.jpg"/></p>' +
      '<p>欢迎欢迎<br/></p>',

    // 支持多种附件形式，可以是String, Buffer或Stream
    attachments: [  
      {
        filename: 'image.png',
        content: Buffer.from(
          'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
          '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
          'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
          'base64'
        ),
      },
    ]
  };
 
  let res = await transporter.sendMail(message);
  return res;
}