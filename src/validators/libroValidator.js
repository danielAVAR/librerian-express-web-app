const { body } = require('express-validator');

const libroValidator = [
  body('titulo').trim().notEmpty().withMessage('El título es obligatorio'),
  body('autor').trim().notEmpty().withMessage('El autor es obligatorio'),
  body('isbn').optional({ values: 'falsy' }).trim().isLength({ max: 20 }).withMessage('El ISBN es muy largo'),
  body('editorial').optional({ values: 'falsy' }).trim(),
  body('anio').optional({ values: 'falsy' }).isInt({ min: 0, max: 2100 }).withMessage('Año inválido'),
  body('precio').isFloat({ min: 0 }).withMessage('Precio inválido'),
  body('stock').isInt({ min: 0 }).withMessage('Stock inválido')
];

module.exports = { libroValidator };
