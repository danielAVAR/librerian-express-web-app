const autorizar = (...roles) => (req, res, next) => {
  if (!roles.includes(req.usuario.rol)) {
    return res.status(403).json({ mensaje: 'No tienes permiso para esta acción' });
  }
  next();
};

module.exports = autorizar;
