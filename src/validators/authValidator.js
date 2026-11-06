const { body } = require('express-validator');

const registroValidator = [
  body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('identificacion').trim().notEmpty().withMessage('La identificación es obligatoria'),
  body('email').trim().toLowerCase().isEmail().withMessage('Correo inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres'),
  body('telefono').optional({ values: 'falsy' }).trim(),
  body('direccion').optional({ values: 'falsy' }).trim()
];

const loginValidator = [
  body('email').trim().toLowerCase().isEmail().withMessage('Correo inválido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria')
];

module.exports = { registroValidator, loginValidator };
