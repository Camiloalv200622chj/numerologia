// src/db.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678', // tu contraseña de MySQL
  database: 'numerologia_db'
});

module.exports = db;
