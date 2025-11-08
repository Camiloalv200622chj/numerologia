// src/controllers/pagosController.js
const pagosModel = require('../models/pagosModel');
const usuarioModel = require('../models/usuarioModel');

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

async function listarPagos(req, res) {
  const pagos = await pagosModel.getAllPagos();
  res.json(pagos);
}

async function pagosPorUsuario(req, res) {
  const usuario_id = req.params.usuario_id;
  const pagos = await pagosModel.getPagosByUsuario(usuario_id);
  res.json(pagos);
}

async function registrarPago(req, res) {
  const { usuario_id, monto, metodo } = req.body;

  if (!usuario_id || !monto || !metodo) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const fecha_pago = new Date().toISOString().slice(0, 10);
  const fecha_vencimiento = addDays(new Date(), 30);

  const created = await pagosModel.createPago({
    usuario_id,
    monto,
    fecha_pago,
    fecha_vencimiento,
    metodo
  });

  // activar usuario automáticamente
  await usuarioModel.setEstadoUsuario(usuario_id, 'activo');

  res.status(201).json({
    pagoId: created.id,
    fecha_vencimiento
  });
}

async function estadoMembresia(req, res) {
  const usuario_id = req.params.usuario_id;
  const usuario = await usuarioModel.getUsuarioById(usuario_id);

  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no existe' });
  }

  res.json({
    usuario_id,
    estado: usuario.estado
  });
}

module.exports = {
  listarPagos,
  pagosPorUsuario,
  registrarPago,
  estadoMembresia
};
