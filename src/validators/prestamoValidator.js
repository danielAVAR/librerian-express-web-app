const { body } = require('express-validator');

const prestamoValidator = [
  body('libro_id').isInt({ min: 1 }).withMessage('Libro inválido'),
  body('usuario_id').isInt({ min: 1 }).withMessage('Usuario inválido'),
  body('fecha_prestamo').optional({ values: 'falsy' }).isISO8601().withMessage('Fecha de préstamo inválida'),
  body('fecha_devolucion_tentativa').isISO8601().withMessage('Fecha de devolución tentativa inválida')
];

module.exports = { prestamoValidator };
