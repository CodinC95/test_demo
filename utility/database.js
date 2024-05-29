const db = require('knex')({
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'chien2811',
      database: 'test',
    },
  });

module.exports = db
