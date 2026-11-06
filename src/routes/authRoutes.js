const express = require('express');
const authController = require('../controllers/authController');
const validar = require('../middlewares/validarMiddleware');
const { registroValidator, loginValidator } = require('../validators/authValidator');

const router = express.Router();

router.post('/registro', registroValidator, validar, authController.registrar);
router.post('/login', loginValidator, validar, authController.login);

module.exports = router;
