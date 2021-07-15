const router = require('koa-router')();
const sqlServices = require('../serives/sql.serivce').sqlServices;
const pathName = require('../config/config').pathName;
const utils = require('../utils/utils');
router.prefix(`${pathName}/user`);

router.post('/login', async (ctx, next) => {
    const { username, password } = ctx.request.body;
    let result = await sqlServices.login({ username, password });
    console.log(result);
    ctx.body = {
        data: result
    };
})



module.exports = router
