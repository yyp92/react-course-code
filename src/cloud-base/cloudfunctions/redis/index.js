// 云函数入口文件
const cloud = require('wx-server-sdk')
const Redis = require('ioredis')

 // 使用当前云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const redis = await new Redis({
  port: 6379,
  host: '10.168.0.11', 
  // 4 (IPv4) 或 6 (IPv6)
  family: 4, 
  // redis的密码
  password: 'cloudbase2020',
  db: 0,
})

// 云函数入口函数
exports.main = async (event, context) => {
  await redis.zadd('Score', 145, 'user1')
  await redis.zadd('Score', 134, 'user2')
  await redis.zadd('Score', 117, 'user3')
  await redis.zadd('Score', 147, 'user4')
  await redis.zadd('Score', 125, 'user5')

  const score = await redis.zscore('Score', 'user3')
  console.log('用户3的分数', score)

  const rank = await redis.zrevrank('Score', 'user5')
  console.log('用户5的排名', rank)

  return {'用户3的分数': score, '用户5的排名': rank}
}