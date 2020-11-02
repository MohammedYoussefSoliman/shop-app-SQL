// const sql = require('mysql2');
// const pool = sql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'shop-app',
//     password: 'tatijanamad0'
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('shop-app', 'root', 'tatijanamad0', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;