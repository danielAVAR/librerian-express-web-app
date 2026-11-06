const bcrypt = require('bcryptjs');
const usuarioModel = require('../models/usuarioModel');
const clienteModel = require('../models/clienteModel');
const AppError = require('../utils/AppError');
const { generarToken } = require('../utils/jwt');
const ejecutarEnTransaccion = require('../utils/transaccion');
const usuarioDto = require('../dtos/usuarioDto');

const registrar = async (datos) => {
  const existente = await usuarioModel.buscarPorEmail(datos.email);
  if (existente) {
    throw new AppError('El correo ya está registrado', 409);
  }

  const hash = await bcrypt.hash(datos.password, 10);

  const usuarioId = await ejecutarEnTransaccion(async (conn) => {
    const id = await usuarioModel.crear({ ...datos, password: hash }, conn);
    await clienteModel.crear({ ...datos, usuario_id: id }, conn);
    return id;
  });

  const usuario = await usuarioModel.buscarPorId(usuarioId);
  return { token: generarToken(usuario), usuario: usuarioDto(usuario) };
};

const login = async (email, password) => {
  const usuario = await usuarioModel.buscarPorEmail(email);
  if (!usuario) {
    throw new AppError('Correo o contraseña incorrectos', 401);
  }

  const coincide = await bcrypt.compare(password, usuario.password);
  if (!coincide) {
    throw new AppError('Correo o contraseña incorrectos', 401);
  }

  return { token: generarToken(usuario), usuario: usuarioDto(usuario) };
};

module.exports = { registrar, login };
