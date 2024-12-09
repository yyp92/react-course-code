// 云函数入口文件
const cloud = require('wx-server-sdk')
const tencentcloud = require("tencentcloud-sdk-Node.js");

const config = require("./config/config.js")
const {secretId, secretKey} = config

// 使用当前云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) 

// 云函数入口函数
exports.main = async (event, context) => {
  const smsClient = tencentcloud.sms.v20190711.Client;
  const models = tencentcloud.sms.v20190711.Models;
  const Credential = tencentcloud.common.Credential;
  const ClientProfile = tencentcloud.common.ClientProfile;
  const HttpProfile = tencentcloud.common.HttpProfile;

  let cred = new Credential(secretId,secretKey)
  let httpProfile = new HttpProfile();
  httpProfile.reqMethod = "POST";
  httpProfile.reqTimeout = 30;
  httpProfile.endpoint = "sms.tencentcloudapi.com";
  let clientProfile = new ClientProfile();
  clientProfile.signMethod = "HmacSHA256";
  clientProfile.httpProfile = httpProfile;
  
  let client = new smsClient(cred, "ap-guangzhou", clientProfile);

  let req = new models.SendSmsRequest();

  /**
   * req.SmsSdkAppid为创建应用环节里的SDKAppID
   * req.Sign为创建签名里的签名内容
   * req.TemplateID为创建正文模板环节里的模板ID
   * req.TemplateParamSet为模板内容里的变量，值为数组，有多少个变量就往数组里填多少个字符串
   * req.PhoneNumberSet为用户的手机号码，测试时可以填你自己的
   */
  req.SmsSdkAppid = "1400364657";
  req.Sign = "HackWeek";
  req.ExtendCode = "";
  req.SenderId = "";
  req.SessionContext = "";
  req.PhoneNumberSet = ["+86185****3"];
  req.TemplateID = "597853";
  req.TemplateParamSet = ["1234","5"];
  

  client.SendSms(req, function (err, response) {
      if (err) {
          console.log(err);
          return;
      }
      console.log(response.to_json_string());
  });
}