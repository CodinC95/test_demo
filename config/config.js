require('dotenv').config();
const config = {
    development: {
        username: process.env.MY_SQL_USERNAME,
        password: process.env.MY_SQL_PASSWORD,
        database: 'test',
        host: process.env.MY_SQL_HOST,
        port: process.env.MY_SQL_PORT,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    },
    test: {
        username: process.env.MY_SQL_USERNAME,
        password: process.env.MY_SQL_PASSWORD,
        database: 'test',
        host: process.env.MY_SQL_HOST,
        port: process.env.MY_SQL_PORT,
        dialect: 'mysql',
    },
    production: {
        username: process.env.MY_SQL_USERNAME,
        password: process.env.MY_SQL_PASSWORD,
        database: 'test',
        host: process.env.MY_SQL_HOST,
        port: process.env.MY_SQL_PORT,
        dialect: 'mysql',
    },
};

module.exports = config;