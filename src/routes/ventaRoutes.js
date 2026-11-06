const express = require('express');
const ventaController = require('../controllers/ventaController');
const autenticar = require('../middlewares/authMiddleware');
const autorizar = require('../middlewares/roleMiddleware');
const validar = require('../middlewares/validarMiddleware');
const { ventaValidator } = require('../validators/ventaValidator');

const router = express.Router();

router.use(autenticar, autorizar('admin'));
router.get('/', ventaController.listar);
router.post('/', ventaValidator, validar, ventaController.crear);

module.exports = router;
