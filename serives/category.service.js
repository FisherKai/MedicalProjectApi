let execuSql = require('../config/mysql.config');
const { Entity } = require('../utils/response');
const {
    _query_icon_list,
    _query_seckill_list_by_time,
    _query_Medicine_by_id
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
    },
    querySeckillList: async function () {
        // 先查询seckill表，获取推荐Id
        let res1 = await execuSql(_query_seckill_list_by_time);
        let result = [];
        res1.length > 0 && res1.forEach(async (item) => {
            console.log('item',item);
            let r = await execuSql(_query_Medicine_by_id, item.medic_id);
            console.log(`r:`,r);
            result.push(r);
        })
        return Entity(result, SUCCESS)
    }
}

module.exports = {
    sqlServices
}