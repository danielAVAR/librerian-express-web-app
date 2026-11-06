const libroService = require('../services/libroService');

const listar = async (req, res) => {
  res.json(await libroService.listar(req.query.busqueda));
};

const obtener = async (req, res) => {
  res.json(await libroService.obtener(req.params.id));
};

const crear = async (req, res) => {
  res.status(201).json(await libroService.crear(req.body));
};

const actualizar = async (req, res) => {
  res.json(await libroService.actualizar(req.params.id, req.body));
};

const eliminar = async (req, res) => {
  await libroService.eliminar(req.params.id);
  res.json({ mensaje: 'Libro eliminado' });
};

module.exports = { listar, obtener, crear, actualizar, eliminar };
