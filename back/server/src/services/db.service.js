const mysql = require('mysql2/promise');
var env = process.env.NODE_ENV || 'development';
var dbConfig = require('../configs/db.config')[env];

async function query(sql, params) {
  const connection = await mysql.createConnection(dbConfig);
  const [results, ] = await connection.execute(sql, params);

  connection.end();

  return results;
}

module.exports = {
  query
}