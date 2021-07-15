const jsonwebtoken = require('jsonwebtoken');
const { SECRET, tokenTime } = require('../config/config')

/**
 * 获取token
 * @param {*} param0 
 */
function getToken({ username, userid }) {
    jsonwebtoken.sign({
        name: username,
        id: userid
    }, SECRET, { expiresIn: tokenTime })
}
module.exports = {
    getToken,
}