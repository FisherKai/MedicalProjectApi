/**
 * 定义执行sql
 */
module.exports = {
    user: {
        _query_by_username: `select id from user where username = ?`,
        _query_by_username_and_password: `select id from user where username = ? and password = ?`,
        _add: `insert into user (username,password) values(?,?)`
    }
}