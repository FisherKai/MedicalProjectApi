const router = require('koa-router')();
const sqlServices=require('../serives/sql.serivce').sqlServices;
const pathName=require('../config/config').pathName;
router.prefix(`${pathName}/index`)

/**
 * Test
 */
router.get('/getUser', async (ctx, next) => {
  let result = await sqlServices.findUserAll();
  console.log(result);
  ctx.body = {
    data: result
  };
})

module.exports = router
