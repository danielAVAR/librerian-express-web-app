const bcrypt = require('bcryptjs');
const usuarioModel = require('../models/usuarioModel');
const clienteModel = require('../models/clienteModel');
const prestamoModel = require('../models/prestamoModel');
const ventaService = require('./ventaService');
const AppError = require('../utils/AppError');
const usuarioDto = require('../dtos/usuarioDto');

const obtenerPerfil = async (usuarioId) => {
  const usuario = await usuarioModel.buscarPorId(usuarioId);
  if (!usuario) {
    throw new AppError('Usuario no encontrado', 404);
  }

  const cliente = await clienteModel.buscarPorUsuarioId(usuarioId);
  return usuarioDto(usuario, cliente);
};

const actualizarPerfil = async (usuarioId, datos) => {
  const usuario = await usuarioModel.buscarPorId(usuarioId);
  if (!usuario) {
    throw new AppError('Usuario no encontrado', 404);
  }

  const duplicado = await usuarioModel.buscarPorEmail(datos.email);
  if (duplicado && duplicado.id !== usuarioId) {
    throw new AppError('El correo ya está en uso', 409);
  }

  const password = datos.password ? await bcrypt.hash(datos.password, 10) : usuario.password;
  await usuarioModel.actualizar(usuarioId, {
    nombre: datos.nombre,
    email: datos.email,
    password
  });

  const cliente = await clienteModel.buscarPorUsuarioId(usuarioId);
  if (cliente) {
    await clienteModel.actualizar(cliente.id, {
      nombre: datos.nombre,
      telefono: datos.telefono,
      direccion: datos.direccion,
      email: datos.email
    });
  }

  return obtenerPerfil(usuarioId);
};

const historialPrestamos = (usuarioId) => {
  return prestamoModel.listarPorUsuario(usuarioId);
};

const historialCompras = async (usuarioId) => {
  const cliente = await clienteModel.buscarPorUsuarioId(usuarioId);
  if (!cliente) {
    return [];
  }
  return ventaService.listarPorCliente(cliente.id);
};

const listarTodos = async () => {
  const usuarios = await usuarioModel.listar();
  return usuarios.map((usuario) => usuarioDto(usuario));
};

module.exports = { obtenerPerfil, actualizarPerfil, historialPrestamos, historialCompras, listarTodos };
