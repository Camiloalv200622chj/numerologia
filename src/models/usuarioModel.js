// src/models/usuarioModel.js
const db = require('../db'); // Asegúrate de tener src/db.js configurado

async function getAllUsuarios() {
  const [rows] = await db.query('SELECT * FROM usuarios');
  return rows;
}

async function getUsuarioById(id) {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
}

async function createUsuario({ nombre, email, fecha_nacimiento }) {
  const [result] = await db.query(
    'INSERT INTO usuarios (nombre, email, fecha_nacimiento) VALUES (?, ?, ?)',
    [nombre, email, fecha_nacimiento]
  );
  return { id: result.insertId };
}

async function updateUsuario(id, data) {
  const { nombre, email, fecha_nacimiento } = data;
  await db.query(
    'UPDATE usuarios SET nombre = ?, email = ?, fecha_nacimiento = ? WHERE id = ?',
    [nombre, email, fecha_nacimiento, id]
  );
}

async function setEstadoUsuario(id, estado) {
  await db.query('UPDATE usuarios SET estado = ? WHERE id = ?', [estado, id]);
}

async function deleteUsuario(id) {
  await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
}

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  setEstadoUsuario,
  deleteUsuario
};
