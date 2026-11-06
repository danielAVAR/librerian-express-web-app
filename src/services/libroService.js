const libroModel = require('../models/libroModel');
const AppError = require('../utils/AppError');

const listar = (busqueda) => {
  return libroModel.listar(busqueda);
};

const obtener = async (id) => {
  const libro = await libroModel.buscarPorId(id);
  if (!libro) {
    throw new AppError('Libro no encontrado', 404);
  }
  return libro;
};

const crear = async (datos) => {
  const id = await libroModel.crear(datos);
  return obtener(id);
};

const actualizar = async (id, datos) => {
  await obtener(id);
  await libroModel.actualizar(id, datos);
  return obtener(id);
};

const eliminar = async (id) => {
  await obtener(id);
  await libroModel.eliminar(id);
};

module.exports = { listar, obtener, crear, actualizar, eliminar };
