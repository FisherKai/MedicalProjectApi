/**
 * 定义执行sql
 */
module.exports = {
    user: {
        _query_by_username: `select id from user where username = ?`,
        _query_by_username_and_password: `select id from user where username = ? and password = ?`,
        _add: `insert into user (username,password) values(?,?)`,
        _query_icon_list: `select * from iconlist`,
        _query_seckill_list_by_time: `SELECT * FROM seckill WHERE start_time <= NOW() AND end_time >= NOW()`,
        _query_Medicine_by_id: `select * from medicine where id = ?`
    }
}