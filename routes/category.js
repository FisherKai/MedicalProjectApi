const router = require('koa-router')();
const sqlServices=require('../serives/category.service').sqlServices;
const pathName=require('../config/config').pathName;
router.prefix(`${pathName}/category`)


router.get('/getIconList', async (ctx, next) => {
  let result = await sqlServices.queryIconList();
  console.log(result);
  ctx.body = result
})

module.exports = router
