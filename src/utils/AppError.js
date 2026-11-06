class AppError extends Error {
  constructor(mensaje, codigo = 400) {
    super(mensaje);
    this.codigo = codigo;
  }
}

module.exports = AppError;
