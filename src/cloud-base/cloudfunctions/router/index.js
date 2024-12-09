// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router');

const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate

// 使用当前云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) 

// 云函数入口函数
exports.main = async (event, context) => {
  // const app = new TcbRouter({event})
  // const {OPENID} = cloud.getWXContext()

  // // 适用于所有的路由
  // app.use(async (ctx, next) => {
  //   // 声明data为一个对象
  //   ctx.data = {} 
  //   await next(); 
  // })

  // // 路由为user
  // app.router('user', async (ctx, next) => {
  //   ctx.data.openId = OPENID
  //   ctx.data.name = '小明'
  //   ctx.data.interest = ["爬山", "旅游", "读书"]
  //   // 返回到小程序端的数据
  //   ctx.body = { 
  //     "openid": ctx.data.openId,
  //     "姓名": ctx.data.name,
  //     "兴趣": ctx.data.interest
  //   }
  // })

  // return app.serve()




  /**
   * tcb-router管理数据库的增删改查
   */
  const collection= "" //数据库的名称
  const app = new TcbRouter({event})
  const {adddata, deleteid, updatedata, querydata, updateid, updatequery} = event
  app.use(async (ctx, next) => {
    ctx.data = {}
    await next(); 
  });

  app.router('add',async (ctx, next)=>{
    const addresult = await db.collection(collection).add({
      data: adddata
    })
    ctx.data.addresult = addresult
    ctx.body = {"添加记录的返回结果": ctx.data.addresult}
  })

  app.router('delete',async(ctx,next)=>{
    const deleteresult = await db.collection(collection).where({
      id: deleteid
    }).remove()
    ctx.data.deleteresult = deleteresult
    ctx.body = {"删除记录的返回结果": ctx.data.deleteresult}
  })

  app.router('update',async(ctx,next)=>{
    const getdata = await db.collection(collection).where({
      id: updateid
    }).update({
      data: updatedata
    })
    ctx.data.getresult = getdata
    ctx.body = {"查询记录的返回结果": ctx.data.getresult}
  })

  app.router('get',async(ctx,next)=>{
    const getdata = await db.collection(collection).where(querydata).get()
    ctx.data.getresult = getdata
    ctx.body = {"查询记录的返回结果": ctx.data.getresult}
  })

  return app.serve();
}