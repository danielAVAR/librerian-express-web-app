const { body } = require('express-validator');

const clienteValidator = [
  body('identificacion').trim().notEmpty().withMessage('La identificación es obligatoria'),
  body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('telefono').optional({ values: 'falsy' }).trim(),
  body('direccion').optional({ values: 'falsy' }).trim(),
  body('email').optional({ values: 'falsy' }).trim().isEmail().withMessage('Correo inválido')
];

module.exports = { clienteValidator };
