const express = require('express');
const clienteController = require('../controllers/clienteController');
const autenticar = require('../middlewares/authMiddleware');
const autorizar = require('../middlewares/roleMiddleware');
const validar = require('../middlewares/validarMiddleware');
const { clienteValidator } = require('../validators/clienteValidator');

const router = express.Router();

router.use(autenticar, autorizar('admin'));
router.get('/', clienteController.listar);
router.post('/', clienteValidator, validar, clienteController.crear);

module.exports = router;
