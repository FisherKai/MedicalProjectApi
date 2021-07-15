let execuSql = require('../config/mysql.config');
const { Entity } = require('../utils/response');
const { getToken } = require('../utils/token');
const { _query_by_username,
    _query_by_username_and_password,
    _add } = require('../utils/sql').user;
const { SUCCESS,
    ERROR_OF_PASAWORD,
    ERRPR_OF_NOT_FOUND_USER,
    ERRPR_USERNAME_IS_EXIST,
    ERROR,
    ADD_SUCCESS,
    ADD_ERROR } = require('../config/const.config').msg;

let sqlServices = {
    findUserAll: async function () {
        const _sql = `select * from user;`
        return await execuSql(_sql)
    },

    login: async function ({ username, password }) {
        // 检查数据库是否存在用户名
        let username_result = await execuSql(_query_by_username, [username]);
        // 检查数据库是否存在一条用户信息
        let userinfo_result = await execuSql(_query_by_username_and_password, [username, password]);
        let res = {}, tokenInfo;
        if (username_result.length > 0 && userinfo_result.length > 0) {
            // 获取token
            tokenInfo = getToken({ username, userid: userinfo_result[0].id })
            res = Entity({
                token: tokenInfo
            }, SUCCESS);
        } else if (username_result.length > 0 && userinfo_result.length == 0) {
            res = Entity({}, ERROR_OF_PASAWORD)
        } else {
            res = Entity({}, ERRPR_OF_NOT_FOUND_USER)
        }
        return res;
    },

    register: async function ({ username, password }) {
        // 检查数据库是否存在用户名
        let username_result = await execuSql(_query_by_username, [username]);
        let result = {};
        if (username_result.length > 0) {
            // 存在一条记录
            result = Entity({}, ERRPR_USERNAME_IS_EXIST)
        } else {
            let res = await execuSql(_add, [username, password]);
            if (res.affectedRows === 1 && res.insertId) {
                result = Entity({
                    userId: res.insertId
                }, ADD_SUCCESS)
            } else {
                result = Entity({}, ADD_ERROR)
            }
        }

        return result;
    }
}

module.exports = {
    sqlServices
}