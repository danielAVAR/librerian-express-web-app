const authService = require('../services/authService');

const registrar = async (req, res) => {
  const datos = await authService.registrar(req.body);
  res.status(201).json(datos);
};

const login = async (req, res) => {
  const datos = await authService.login(req.body.email, req.body.password);
  res.json(datos);
};

module.exports = { registrar, login };
