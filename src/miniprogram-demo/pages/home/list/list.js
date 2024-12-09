// pages/home/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newstitle:[
      "瑞幸咖啡：有望在三季度达到门店运营的盈亏平衡点",
      "腾讯：广告高库存量还是会持续到下一年",
      "上汽集团云计算数据中心落户郑州，总投资20亿元",
      "京东：月收入超2万元快递小哥数量同比增长163%",
      "腾讯：《和平精英》日活跃用户已超五千万",
    ],

    movies: [{
      name: "肖申克的救赎", 
      img:"https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.webp",
      desc:"有的人的羽翼是如此光辉，即使世界上最黑暗的牢狱，也无法长久地将他围困！"},
      {
        name: "霸王别姬",
        img: "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.webp",
        desc: "风华绝代。"
      },
      {
        name: "这个杀手不太冷",
        img: "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.webp",
        desc: "怪蜀黍和小萝莉不得不说的故事。"
      },
      {
        name: "阿甘正传",
        img: "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.webp",
        desc: "一部美国近现代史。"
      },
      {
        name: "美丽人生",
        img: "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.webp",
        desc: "最美的谎言。"
      },
      {
        name: "泰坦尼克号",
        img: "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.webp",
        desc: "失去的才是永恒的。"
      },
      {
        name: "千与千寻",
        img: "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.webp",
        desc: "最好的宫崎骏，最好的久石让。"
      },
      {
        name: "辛德勒名单",
        img: "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.webp",
        desc: "拯救一个人，就是拯救整个世界。"
      },     
    ],

    grids:[
      { imgurl:"https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon1.png",
        title:"招聘"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon2.png",
        title: "房产"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon3.png",
        title: "二手车新车"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon4.png",
        title: "二手"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon5.png",
        title: "招商加盟"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon6.png",
        title: "兼职"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon7.png",
        title: "本地"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon8.png",
        title: "家政"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon9.png",
        title: "金币夺宝"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon10.png",
        title: "送现金"
      },
    ],

    listicons:[{
      icon:"https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/listicons1.png",
      title:"我的文件",
      desc:""
    },
    {
      icon:"https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/listicons2.png",
      title:"我的收藏",
      desc:"收藏列表"
    },
    {
      icon:"https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/listicons3.png",
      title:"我的邮件",
      desc:""
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})