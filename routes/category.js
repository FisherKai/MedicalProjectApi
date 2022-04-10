const router = require('koa-router')();
const sqlServices = require('../serives/category.service').sqlServices;
const pathName = require('../config/config').pathName;
router.prefix(`${pathName}/category`)

/**
 * 获取icon列表
 */
router.get('/getIconList', async (ctx, next) => {
  let result = await sqlServices.queryIconList();
  ctx.body = result
})

/**
 * 获取推荐商品列表
 */
router.post('/getSeckill', async (ctx, next) => {
  let result = await sqlServices.querySeckillList();
  ctx.body = result;
})

module.exports = router
