let execuSql = require('../config/mysql.config');
const { Entity } = require('../utils/response');
const { SUCCESS,
    ERROR_OF_PASAWORD,
    ERRPR_OF_NOT_FOUND_USER,
    ERRPR_USERNAME_IS_EXIST,
    ERROR,
    ADD_SUCCESS,
    ADD_ERROR } = require('../config/const.config').msg;

let sqlServices = {
    getAllNewList: async function () {
        const _sql = `SELECT * from newlist WHERE NOW()>= effectivetime AND NOW() <=deadtime;`
        let res = await execuSql(_sql);
        return Entity(res, SUCCESS)
    }
}

module.exports = {
    sqlServices
}