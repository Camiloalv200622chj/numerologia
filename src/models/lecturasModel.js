// src/models/lecturasModel.js
const db = require('../db');

async function createLectura({ usuario_id, tipo, contenido }) {
  const [res] = await db.query(
    `INSERT INTO lecturas (usuario_id, tipo, contenido)
     VALUES (?, ?, ?)`,
    [usuario_id, tipo, contenido]
  );
  return { id: res.insertId };
}

async function getLecturasByUsuario(usuario_id) {
  const [rows] = await db.query(
    'SELECT * FROM lecturas WHERE usuario_id = ? ORDER BY fecha_lectura DESC',
    [usuario_id]
  );
  return rows;
}

async function getLecturaById(id) {
  const [rows] = await db.query(
    'SELECT * FROM lecturas WHERE id = ?',
    [id]
  );
  return rows[0];
}

async function existeLecturaPrincipal(usuario_id) {
  const [rows] = await db.query(
    `SELECT COUNT(*) AS total
     FROM lecturas
     WHERE usuario_id = ? AND tipo = 'principal'`,
    [usuario_id]
  );
  return rows[0].total > 0;
}

module.exports = {
  createLectura,
  getLecturasByUsuario,
  getLecturaById,
  existeLecturaPrincipal
};
