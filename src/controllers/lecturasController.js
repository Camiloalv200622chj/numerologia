// src/controllers/lecturasController.js
const lecturasModel = require('../models/lecturasModel');
const usuarioModel = require('../models/usuarioModel');
const { generarLecturaPrincipal, generarLecturaDiaria } = require('../utils/aiSimulator');

async function generarPrincipal(req, res) {
  const usuario_id = req.params.usuario_id;
  const usuario = await usuarioModel.getUsuarioById(usuario_id);

  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

  const existe = await lecturasModel.existeLecturaPrincipal(usuario_id);
  if (existe) return res.status(400).json({ error: 'La lectura principal ya existe' });

  const contenido = generarLecturaPrincipal(usuario.fecha_nacimiento, usuario.nombre);

  const created = await lecturasModel.createLectura({
    usuario_id,
    tipo: 'principal',
    contenido
  });

  res.status(201).json({
    lecturaId: created.id,
    contenido
  });
}

async function generarDiaria(req, res) {
  const usuario_id = req.params.usuario_id;
  const usuario = await usuarioModel.getUsuarioById(usuario_id);

  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  if (usuario.estado !== 'activo') {
    return res.status(403).json({ error: 'Usuario no activo' });
  }

  const contenido = generarLecturaDiaria(usuario);

  const created = await lecturasModel.createLectura({
    usuario_id,
    tipo: 'diaria',
    contenido
  });

  res.status(201).json({
    lecturaId: created.id,
    contenido
  });
}

async function lecturasPorUsuario(req, res) {
  const usuario_id = req.params.usuario_id;
  const lecturas = await lecturasModel.getLecturasByUsuario(usuario_id);
  res.json(lecturas);
}

async function lecturaPorId(req, res) {
  const id = req.params.id;
  const l = await lecturasModel.getLecturaById(id);

  if (!l) return res.status(404).json({ error: 'Lectura no encontrada' });

  res.json(l);
}

module.exports = {
  generarPrincipal,
  generarDiaria,
  lecturasPorUsuario,
  lecturaPorId
};
