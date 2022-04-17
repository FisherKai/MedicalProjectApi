const router = require('koa-router')();
const sqlServices = require('../serives/category.service').sqlServices;
const pathName = require('../config/config').pathName;
const koaRequest = require('koa2-request')
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

router.post('/getKnowdgeData', async (ctx, next) => {
  console.log(ctx.request.body)
  const { name } = ctx.request.body
  if (name) {
    let res = koaRequest({
      url: 'http://192.168.0.103:8868/getKnowledge',
      method: 'get',
      qs: {
        name: name
      }
    });
    let result = await res;
    if(result){
      result.forEach(element => {
        console.log(element.str)
      });
    }
    ctx.body = JSON.parse(result.body).content.result
  }
})

module.exports = router
