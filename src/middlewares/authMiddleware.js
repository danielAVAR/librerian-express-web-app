const { verificarToken } = require('../utils/jwt');

const autenticar = (req, res, next) => {
  const encabezado = req.headers.authorization || '';
  const token = encabezado.startsWith('Bearer ') ? encabezado.slice(7) : null;

  if (!token) {
    return res.status(401).json({ mensaje: 'Token requerido' });
  }

  try {
    req.usuario = verificarToken(token);
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

module.exports = autenticar;
