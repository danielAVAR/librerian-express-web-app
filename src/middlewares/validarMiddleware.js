const { validationResult } = require('express-validator');

const validar = (req, res, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      mensaje: 'Datos inválidos',
      errores: errores.array().map((error) => error.msg)
    });
  }

  next();
};

module.exports = validar;
