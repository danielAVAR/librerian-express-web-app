const errorHandler = (error, req, res, next) => {
  if (error.codigo) {
    return res.status(error.codigo).json({ mensaje: error.message });
  }

  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ mensaje: 'Ya existe un registro con ese dato único' });
  }

  if (error.code === 'ER_ROW_IS_REFERENCED_2') {
    return res.status(409).json({ mensaje: 'No se puede eliminar porque tiene registros asociados' });
  }

  if (error.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({ mensaje: 'Una de las referencias no existe' });
  }

  console.error(error);
  return res.status(500).json({ mensaje: 'Error interno del servidor' });
};

module.exports = errorHandler;
