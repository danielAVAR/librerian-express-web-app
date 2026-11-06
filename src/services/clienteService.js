const clienteModel = require('../models/clienteModel');

const listar = () => {
  return clienteModel.listar();
};

const crear = async (datos) => {
  const id = await clienteModel.crear(datos);
  return clienteModel.buscarPorId(id);
};

module.exports = { listar, crear };
