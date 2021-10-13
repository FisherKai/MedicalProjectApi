let execuSql = require('../config/mysql.config');
const { Entity } = require('../utils/response');
const {
    _query_icon_list
} = require('../utils/sql').user;
const {
    SUCCESS,
    ERROR_OF_PASAWORD,
    ERRPR_OF_NOT_FOUND_USER,
    ERRPR_USERNAME_IS_EXIST,
    ERROR,
    ADD_SUCCESS,
    ADD_ERROR } = require('../config/const.config').msg;

let sqlServices = {
    queryIconList: async function () {
        let res = await execuSql(_query_icon_list);
        console.log(res);
        return Entity(res, SUCCESS)
    }
}

module.exports = {
    sqlServices
}