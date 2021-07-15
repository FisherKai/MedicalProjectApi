/**
 * 返回体处理插件
 */
const cons = require('../config/const.config');
function Entity(data, type) {
    return {
        data: data || {},
        msg: cons.msg[type],
        retCode: type.includes('SUCCESS') ? 1 : 0
    }
}
module.exports = {
    Entity
}