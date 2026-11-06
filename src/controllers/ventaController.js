const ventaService = require('../services/ventaService');

const listar = async (req, res) => {
  res.json(await ventaService.listarTodas());
};

const crear = async (req, res) => {
  res.status(201).json(await ventaService.registrar(req.body, req.usuario.id));
};

module.exports = { listar, crear };
