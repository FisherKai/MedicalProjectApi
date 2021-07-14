const router = require('koa-router')();
const sqlServices=require('../serives/sql.serivce').sqlServices;
const pathName=require('../config/config').pathName;
router.prefix(`${pathName}/user`);





module.exports = router
