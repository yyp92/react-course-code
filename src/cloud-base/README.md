# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
- [查询操作符](https://juejin.cn/book/6897486502482149376/section/6897525958589284355)
- [wx.chooseImage()](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseImage.html)
- [wx.getImageInfo()](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.getImageInfo.html)
- [wx.previewImage()](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.previewImage.html)
- [wx.saveImageToPhotosAlbum()](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.saveImageToPhotosAlbum.html)
- [wx.compressImage()](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.compressImage.html)
- [wx.chooseLocation()](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.chooseLocation.html)
- [wx.request网络数据请求](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)
- [Canvas MDN技术文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)
- [input技术文档](https://developers.weixin.qq.com/miniprogram/dev/component/input.html)
- [BackgroundAudioManager技术文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/BackgroundAudioManager.html)
- [录音管理器的技术文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/RecorderManager.html)
- [echarts-for-weixin Github地址](https://github.com/ecomfe/echarts-for-weixin)
- [moment中文文档](http://momentjs.cn/)
- [timezone技术文档](https://momentjs.com/timezone/)
- [ipify Github地址](https://github.com/sindresorhus/ipify)
- [Lodash中文文档](https://www.lodashjs.com/)
- [node-qrcode Github地址](https://github.com/soldair/node-qrcode)
- [sharp官方技术文档](https://sharp.pixelplumbing.com/)
- [Nodemailer GitHub地址](https://github.com/nodemailer/nodemailer)
- [Nodemailer官方文档](https://nodemailer.com/about/)
- [node-xlsx](https://github.com/mgcrea/node-xlsx)
- [私有网络](https://console.cloud.tencent.com/)
- [MySQL](https://console.cloud.tencent.com/cdb/instance)
- [云开发CloudBase](https://console.cloud.tencent.com/tcb/env/index?rid=4)
- [mysql模块技术文档](https://github.com/mysqljs/mysql)
- [serverless-mysql技术文档](https://github.com/jeremydaly/serverless-mysql)
- [Sequelize](https://sequelize.org/docs/v6/)
- [短信控制台](https://cloud.tencent.com/login?s_url=https%3A%2F%2Fconsole.cloud.tencent.com%2Fsmsv2)
- [API密钥管理](https://cloud.tencent.com/login?s_url=https%3A%2F%2Fconsole.cloud.tencent.com%2Fcam%2Fcapi)
- [服务端接口列表](https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/)
- [腾讯云费用中心](https://cloud.tencent.com/login?s_url=https%3A%2F%2Fconsole.cloud.tencent.com%2Fexpense%2Foverview)
- [腾讯云云开发的网页控制台](https://cloud.tencent.com/login?s_url=https%3A%2F%2Fconsole.cloud.tencent.com%2Ftcb%2Fenv%2Findex)
- [CAM角色](https://cloud.tencent.com/login?s_url=https%3A%2F%2Fconsole.cloud.tencent.com%2Fcam%2Frole)
- [腾讯云云开发网页控制台](https://cloud.tencent.com/login?s_url=https%3A%2F%2Fconsole.cloud.tencent.com%2Ftcb%2Fadd)
- [数据万象存储桶](https://cloud.tencent.com/login?s_url=https%3A%2F%2Fconsole.cloud.tencent.com%2Fci%2Fbucket)
- [数据万象的技术文档](https://cloud.tencent.com/document/product/460/36540)

### api
- [聚合API](https://dashboard.juhe.cn/data/index/my)
- [和风天气](https://console.qweather.com/#/apps)
- [和风天气技术文档](https://dev.qweather.com/docs/configuration)
- [腾讯LBS位置服务](https://lbs.qq.com/dev/console/home)
- [WebServiceAPI Key配置中签名校验](https://lbs.qq.com/FAQ/index.html)
- [md5开源项目下载链接](https://github.com/blueimp/JavaScript-MD5/archive/master.zip)
- [坐标的逆地址解析](https://lbs.qq.com/service/webService/webServiceGuide/webServiceGcoder)
- [微信小程序：个性地图使用指南](https://lbs.qq.com/product/miniapp/guide/)




## 常用正则
```js
//是否为邮箱的验证，其中\u4e00-\u9fa5为Unicode汉字编码范围
let isTrue =/^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;

//是否为数字的验证，密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
let isTrue =^[a-zA-Z]\w{5,17}$;

//强密码的验证，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
let isTrue = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;

//用户名验证，4到16位（字母，数字，下划线，减号）
let isTrue = /^[a-zA-Z0-9_-]{4,16}$/;

//是否为手机号的验证，手机号有11个数字，尤其是开头的3位数可以作为验证标准
let isTrue = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;  
```


## 表单校验插件
```bash
npm install validator@latest
```


## canvas
### 填充图形与轮廓的颜色
- fillStyle = color 设置图形的填充颜色；
- strokeStyle = color设置图形轮廓的颜色。

### 线型
- lineWidth = value 设置线条宽度；
- lineCap = type 设置线条末端样式。
- lineJoin = type 设定线条与线条间接合处的样式。
- miterLimit = value 限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。
- getLineDash() 返回一个包含当前虚线样式，长度为非负偶数的数组。
- setLineDash(segments) 设置当前虚线样式。
- lineDashOffset = value 设置虚线样式的起始偏移量。

### 透明度、渐变、阴影
- globalAlpha = transparencyValue这个属性会影响canvas里所有图形的透明度，有效的值范围是 0.0 （完全透明）到 1.0（完全不透明）；
- createLinearGradient(x1, y1, x2, y2)绘制线性渐变，渐变的起点 (x1,y1) 与终点 (x2,y2)；
- createRadialGradient(x1, y1, r1, x2, y2, r2)绘制径向渐变会绘制两个圆，一是以 (x1,y1) 为原点，半径为r1的圆；二是以 (x2,y2) 为原点，半径为 r2 的圆。
- shadowOffsetX = float和shadowOffsetY = float用来设定阴影在X和Y轴的延伸距离；
- shadowBlur = float用于设定阴影的模糊程度；
- shadowColor = color用于设定阴影颜色效果，默认是全透明的黑色。

### 绘制文本
- font = value绘制文本的样式，语法与CSS font属性相同，默认的字体是10px sans-serif；
- textAlign = value，文本对齐选项，如start, end, left, right,center；
- textBaseline = value，基线对齐选项，如top, hanging, middle, alphabetic, ideographic, bottom。默认值为alphabetic；
- direction = value，文本方向，如ltr, rtl, inherit。默认值是 inherit；
- fillText(text, x, y [, maxWidth])在指定的(x,y)位置填充指定的文本；
- strokeText(text, x, y [, maxWidth])在指定的(x,y)位置绘制文本边框。



## nodejs 内置模块
- fs 模块： 文件目录的创建、删除、查询以及文件的读取和写入；
- os模块： 提供了一些基本的系统操作函数；
- path 模块： 提供了一些用于处理文件路径的API；
- url模块： 用于处理与解析 URL；
- http模块： 用于创建一个能够处理和响应 http 响应的服务；
- querystring模块： 解析查询字符串；
- util模块： util 模块主要用于支持 Node.js 内部 API 的需求，大部分实用工具也可用于应用程序与模块开发者；
- net模块： 用于创建基于流的 TCP 或 IPC 的服务器;
- dns模块： 用于域名的解析；
- crypto模块： 提供加密功能，包括对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装；
- zlib模块： zlib 可以用来实现对 HTTP 中定义的 gzip 和 deflate 内容编码机制的支持。
- process模块： 提供有关当前 Node.js 进程的信息并对其进行控制.作为一个全局变量，它始终可供 Node.js 应用程序使用，无需使用 require(), 它也可以使用 require() 显式地访问.
