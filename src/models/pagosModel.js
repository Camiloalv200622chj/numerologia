// src/models/pagosModel.js
const db = require('../db');

async function createPago({ usuario_id, monto, fecha_pago, fecha_vencimiento, metodo }) {
  const [res] = await db.query(
    `INSERT INTO pagos (usuario_id, monto, fecha_pago, fecha_vencimiento, metodo)
     VALUES (?, ?, ?, ?, ?)`,
    [usuario_id, monto, fecha_pago, fecha_vencimiento, metodo]
  );
  return { id: res.insertId };
}

async function getPagosByUsuario(usuario_id) {
  const [rows] = await db.query(
    'SELECT * FROM pagos WHERE usuario_id = ? ORDER BY fecha_pago DESC',
    [usuario_id]
  );
  return rows;
}

async function getAllPagos() {
  const [rows] = await db.query(
    'SELECT * FROM pagos ORDER BY fecha_pago DESC'
  );
  return rows;
}

module.exports = {
  createPago,
  getPagosByUsuario,
  getAllPagos
};
