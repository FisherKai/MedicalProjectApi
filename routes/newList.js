const router = require('koa-router')();
const sqlServices = require('../serives/newList.service').sqlServices;
const pathName = require('../config/config').pathName;
router.prefix(`${pathName}/newlist`)

/**
 * 获取icon列表
 */
router.get('/getAllNewList', async (ctx, next) => {
  let result = await sqlServices.getAllNewList();
  ctx.body = result
})

module.exports = router
