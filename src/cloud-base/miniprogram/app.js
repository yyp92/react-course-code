// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env: 'cloud1-3gkiq8bd984d28e0',

        // 这里的traceUser属性设置为true，会将用户访问记录到用户管理中，在云开发控制台的运营分析—用户访问里可以看到访问记录。
        traceUser: true,
      });
    }

    this.globalData = {
      // 聚合AppKey
      juheKeyHistoryToday: "a21bc0d922f1b143f5601bb49852698a",
      juheKeyBooksECommerce: "cd0f2cfdbfe45118ecacbc9ceae044ff",

      // 和风天气
      hefengKey: 'c5823a1ae18b42a2a793f7546868a06c',

      // 腾讯地图位置服务
      // 你的key
      mapKey: "G6EBZ-3C53U-26SVA-GBQRS-IOMTK-SHFN2",
      // 你的Secret key
      mapSecretKey: "j3JDoBPcIc9Yg2jqmA8L3z0pF2V3mka", 
    };


    /**
     * 数据缓存
     */
    //  ||为逻辑或，就是声明logs为获取缓存里的logs记录，没有时就为空数组
    var logs = wx.getStorageSync('logs') || []

    // unshift()是数组的操作方法，它会将一个或多个元素添加到数组的开头，这样最新的记录就放在数组的最前面，
    // 这里是把Date.now()获取到的时间戳放置到数组的最前面
    logs.unshift(Date.now())

    // 将logs数据存储到缓存指定的key也就是logs里面
    wx.setStorageSync('logs', logs)
    // console.log(logs)
    // console.log(Date.now())
  }
});
