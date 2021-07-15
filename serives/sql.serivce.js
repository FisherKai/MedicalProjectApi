let mysql = require('mysql');
let dbConfig = require('../config/mysql.config');

let pool = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.databasename
});

let sqlServices = {
    query: async function (sql, values) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })

    },

    findUserAll: async function () {
        let _sql = `select * from user;`
        return await this.query(_sql)
    },

    login: async function ({ username, password }) {
        let _sql = `select id from user where username = ? and password = ?`;
        return await this.query(_sql, [username, password]);
    }
}

module.exports = {
    sqlServices
}