const usuarioService = require('../services/usuarioService');

const obtenerPerfil = async (req, res) => {
  res.json(await usuarioService.obtenerPerfil(req.usuario.id));
};

const actualizarPerfil = async (req, res) => {
  res.json(await usuarioService.actualizarPerfil(req.usuario.id, req.body));
};

const historialPrestamos = async (req, res) => {
  res.json(await usuarioService.historialPrestamos(req.usuario.id));
};

const historialCompras = async (req, res) => {
  res.json(await usuarioService.historialCompras(req.usuario.id));
};

const listarTodos = async (req, res) => {
  res.json(await usuarioService.listarTodos());
};

module.exports = { obtenerPerfil, actualizarPerfil, historialPrestamos, historialCompras, listarTodos };
