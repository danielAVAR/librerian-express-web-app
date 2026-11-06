const prestamoService = require('../services/prestamoService');

const listar = async (req, res) => {
  res.json(await prestamoService.listarTodos());
};

const crear = async (req, res) => {
  res.status(201).json(await prestamoService.prestar(req.body));
};

const devolver = async (req, res) => {
  res.json(await prestamoService.devolver(req.params.id));
};

module.exports = { listar, crear, devolver };
