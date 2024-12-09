const formatTime = date => {
  // 获取年 
  const year = date.getFullYear()  

  // 获取月份，月份数值需加1
  const month = date.getMonth() + 1  
  
  // 获取一月中的某一天
  const day = date.getDate()  

  // 获取小时
  const hour = date.getHours() 

  // 获取分钟
  const minute = date.getMinutes() 
  
  // 获取秒
  const second = date.getSeconds() 
 
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')  //会单独来讲解这段代码的意思
}
 
// 格式化数字
const formatNumber = n => {  
  n = n.toString()
  return n[1] ? n : '0' + n 
}

// 模块向外暴露的对象，使用require引用该模块时可以获取
module.exports = {  
  formatTime: formatTime,
  formatNumber: formatNumber
}