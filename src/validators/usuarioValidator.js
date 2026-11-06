const { body } = require('express-validator');

const perfilValidator = [
  body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('email').trim().toLowerCase().isEmail().withMessage('Correo inválido'),
  body('telefono').optional({ values: 'falsy' }).trim(),
  body('direccion').optional({ values: 'falsy' }).trim(),
  body('password').optional({ values: 'falsy' }).isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres')
];

module.exports = { perfilValidator };
