/**
 * 项目配置
 */
module.exports = {
    // 项目前缀
    pathName: '/medical-project/api',
    // JWT密钥
    SECRET: 'kH4DB3nen2BT4nkh',
    // token过期时间
    tokenTime: '7d',
    // 数据库配置
    dbconfig: {
        databasename: 'medicalproject',
        username: 'root',
        password: '123456',
        port: '3306',
        host: 'localhost'
    }
}