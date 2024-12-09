// pages/canvas/canvas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },



  // 测量文本宽度与多行文字处理
  wrapText(context, text, x, y, maxWidth, lineHeight) {
    let words = text.split('');
    console.log(words)
    let line = '';
  
    for (let n = 0; n < text.length; n++) {
      let testLine = line + words[n] + '';
      let metrics = context.measureText(testLine);
      console.log(metrics)
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        console.log(line)
        console.log(x)
        console.log(y)
        context.fillText(line, x, y);
        line = words[n] + '';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  },

  // 图片的来源与装载
  createCanvas() {
    // 真机上需要将图片链接列入安全名单或将图片下载下来
    const imgurl = "https://tcb-1251009918.cos.ap-guangzhou.myqcloud.com/demo/canvas.jpg" 
    const qrcode = "https://tcb-1251009918.cos.ap-guangzhou.myqcloud.com/demo/qrcode.jpg"
  
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        console.log("节点的相关信息", res)
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio
  
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
  
  
        const img1 = canvas.createImage()
        const img2 = canvas.createImage()
  
        img1.onload = function() { 
            img2.src = qrcode; 
        }; 

        img2.onload = function() { 
          ctx.drawImage(img1, 0, 0, res[0].width, res[0].height); 
          ctx.drawImage(img2, 35, 100, 150, 195); 
        }; 

        img1.src = imgurl

        // 将绘制好的canvas对象赋值给data对象里的canvasObj
        this.setData({  
          canvasObj: canvas
        })
      })
  },

  // 保存图片
  saveCanvas(canvasimg) {
    // 注意要先获取权限
    const that = this

    wx.canvasToTempFilePath({
      // 注意这里是canvas，不是canvasId
      canvas: that.data.canvasObj, 
      success(res) {
        console.log(res.tempFilePath)

        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            // 可以使用一些交互式的反馈
            console.log(res)  
          }
        })
      }
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const query = wx.createSelectorQuery()

    /**
     * SelectorQuery.select()返回当前页面下选择器匹配到的第一个节点，与css选择器类似，这里为选择id为book001的节点。
     * NodesRef.fields()返回节点的信息，比如节点的dataset、宽高尺寸size、属性名列表、指定样式名列表、滚动信息以及对应的Context上下文对象，我们可以从console.log了解。
     * SelectorQuery.exec()执行节点信息操作的所有请求，请求结果按请求次序构成数组。
     */
    // query.select('#book001')
    //   .fields({
    //     // 返回节点的dataset，这里为data-book
    //     dataset: true, 
    //     // 返回节点的宽与高的像素
    //     size: true, 
    //     scrollOffset: true,
    //     // 返回指定属性名hover-class里的值，这里值为red
    //     properties: ['hover-class'], 
    //     // 返回节点指定style的对应值
    //     computedStyle: ['margin', 'backgroundcolor','color','padding'],
    //     // 返回节点的绝对布局位置，top,left,bottom,right
    //     rect: true,  
    //   })
    //   .exec(res => {
    //     console.log("节点的信息", res)
    //   })


    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        // 通过打印来了解节点信息
        console.log("节点的相关信息", res)
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        // canvas绘图区域大小，如果设备像素比不为1，就放大；比如高清显示屏为2，绘制时就放大2倍
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)

        // 在下面区域绘制canvas，比如下面是绘制一个填充矩形
        // ctx.fillRect(5, 5, 100, 50) 
        


        /**
         * 绘制矩形
         */
        // 填充矩形的颜色
        // ctx.fillStyle = "#FFA500" 
        // ctx.fillRect(5,5,100,50)   
        // ctx.strokeRect(5,70,100,50)

        // 按照请求的次序可以反复绘制
        // ctx.fillStyle = "#fadc4a"; 
        // ctx.fillRect(5, 125, 100, 50)



        /**
         * 绘制路径与绘制直线
         */
        // 填充矩形的颜色
        // ctx.fillStyle = "#7fe787" 
        // ctx.beginPath()
        // ctx.moveTo(75, 50)
        // ctx.lineTo(100, 75)
        // ctx.lineTo(100, 25)
        // ctx.fill()  



        /**
         * 绘制圆弧
         */
        // 填充矩形的颜色
        // ctx.fillStyle = "#2870f6" 
        // ctx.beginPath();
        // ctx.arc(100, 75, 50, 0, 2 * Math.PI)
        // ctx.fill()

        // ctx.beginPath()
        // ctx.arc(150, 75, 70, Math.PI, 2 * Math.PI, false)
        // ctx.stroke()

        // ctx.beginPath()
        // ctx.moveTo(20, 20)          
        // ctx.lineTo(100, 20)
        // ctx.arcTo(150, 20, 150, 70, 50)
        // ctx.lineTo(150, 120)
        // ctx.stroke()   



        /**
         * 绘制贝塞尔曲线
         */
        // ctx.beginPath();
        // ctx.moveTo(20, 20);
        // ctx.quadraticCurveTo(20, 100, 200, 20);
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.moveTo(20, 20);
        // ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
        // ctx.stroke();



        /**
         * 绘制文本
         */
        // ctx.font = "48px serif";
        // ctx.textAlign = "center"
        // ctx.strokeText("小程", 50, 50);
        // ctx.fillText("xcx", 160, 50)

        // 测量文本宽度与多行文字处理
        ctx.font = "48px serif";
        const text = ctx.measureText("李东bbsky"); // TextMetrics object
        console.log(text)
      })

    this.createCanvas()
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
    const that = this
    const query = wx.createSelectorQuery()
    // query.select('#myCanvas')
    //   .fields({ node: true, size: true })
    //   .exec((res) => {
    //     const canvas = res[0].node
    //     const ctx = canvas.getContext('2d')
    //     const dpr = wx.getSystemInfoSync().pixelRatio

    //     canvas.width = res[0].width * dpr
    //     canvas.height = res[0].height * dpr
    //     ctx.scale(dpr, dpr)

    //     ctx.fillStyle = "#FFA500";
    //     // ctx.fillRect(0,0,canvas.width ,canvas.height)
    //     ctx.font = "16px serif";
    //     ctx.textAlign = "base"
    //     ctx.textBaseline = "top"

    //     let maxWidth = 100;
    //     let lineHeight = 25;

    //     let text1 = "我们用来绘制文本的样式，这个字符串使用和CSS font属性相同的语法"
    //     that.wrapText(
    //       ctx,
    //       text1,
    //       10,
    //       20,
    //       maxWidth,
    //       lineHeight
    //     )    
    //     // ctx.fillText("我们用来绘制文本的样式，这个字符串使用和CSS font属性相同的语法",10,20)
    //   })
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