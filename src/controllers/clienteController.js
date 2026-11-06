const clienteService = require('../services/clienteService');

const listar = async (req, res) => {
  res.json(await clienteService.listar());
};

const crear = async (req, res) => {
  res.status(201).json(await clienteService.crear(req.body));
};

module.exports = { listar, crear };
