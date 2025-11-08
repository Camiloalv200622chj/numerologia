// src/controllers/usuariosController.js
const usuarioModel = require('../models/usuarioModel');

async function listarUsuarios(req, res) {
  const usuarios = await usuarioModel.getAllUsuarios();
  res.json(usuarios);
}

async function obtenerUsuario(req, res) {
  const id = req.params.id;
  const u = await usuarioModel.getUsuarioById(id);
  if (!u) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(u);
}

async function crearUsuario(req, res) {
  const { nombre, email, fecha_nacimiento } = req.body;
  if (!nombre || !email || !fecha_nacimiento) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const inserted = await usuarioModel.createUsuario({ nombre, email, fecha_nacimiento });
  const usuario = await usuarioModel.getUsuarioById(inserted.id);
  res.status(201).json(usuario);
}

async function actualizarUsuario(req, res) {
  const id = req.params.id;
  await usuarioModel.updateUsuario(id, req.body);
  const u = await usuarioModel.getUsuarioById(id);
  res.json(u);
}

async function cambiarEstado(req, res) {
  const id = req.params.id;
  const { estado } = req.body;

  if (!['activo', 'inactivo'].includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }

  await usuarioModel.setEstadoUsuario(id, estado);
  res.json({ message: 'Estado actualizado' });
}

async function eliminarUsuario(req, res) {
  const id = req.params.id;
  await usuarioModel.deleteUsuario(id);
  res.json({ message: 'Usuario eliminado' });
}

module.exports = {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  cambiarEstado,
  eliminarUsuario
};
