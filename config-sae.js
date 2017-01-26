var config = {
    database: process.env.MYSQLV_DATABASE_TEST, // 使用哪个数据库
    username: process.env.MYSQLV_USERNAME, // 用户名
    user: process.env.MYSQLV_USERNAME, // 用户名
    password: process.env.MYSQLV_PASS, // 口令
    host: process.env.MYSQLV_HOST, // 主机名
    dialect: "mysql",
    port: process.env.MYSQLV_PORT // 端口号，MySQL默认3306
};

module.exports = config;