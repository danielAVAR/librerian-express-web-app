const { body } = require('express-validator');

const ventaValidator = [
  body('cliente_id').isInt({ min: 1 }).withMessage('Cliente inválido'),
  body('fecha').optional({ values: 'falsy' }).isISO8601().withMessage('Fecha inválida'),
  body('libros').isArray({ min: 1 }).withMessage('Debe incluir al menos un libro'),
  body('libros.*.libro_id').isInt({ min: 1 }).withMessage('Libro inválido'),
  body('libros.*.cantidad').isInt({ min: 1 }).withMessage('Cantidad inválida')
];

module.exports = { ventaValidator };
