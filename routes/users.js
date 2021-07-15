const router = require('koa-router')();
const sqlServices = require('../serives/user.serivce').sqlServices;
const pathName = require('../config/config').pathName;
const reqUtil = require('../utils/request');
router.prefix(`${pathName}/user`);

router.post('/login', async (ctx, next) => {
    const { username, password } = ctx.request.body;
    let flag = reqUtil.Validation(username, password);
    let result;
    if (flag) {
        result = await sqlServices.login({ username, password });
    } else {
        result = {
            data: {},
            msg: 'parameter error',
            retCode: '0'
        }
    }
    ctx.body = result;
})

router.post('/register', async (ctx, next) => {
    const { username, password } = ctx.request.body;
    let result = await sqlServices.register({ username, password });
    console.log(result);
    ctx.body = result;
})


module.exports = router
