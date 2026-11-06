const jwt = require('jsonwebtoken');

const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRA || '8h' }
  );
};

const verificarToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generarToken, verificarToken };
