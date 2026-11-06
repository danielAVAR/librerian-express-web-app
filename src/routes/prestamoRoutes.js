const express = require('express');
const prestamoController = require('../controllers/prestamoController');
const autenticar = require('../middlewares/authMiddleware');
const autorizar = require('../middlewares/roleMiddleware');
const validar = require('../middlewares/validarMiddleware');
const { prestamoValidator } = require('../validators/prestamoValidator');

const router = express.Router();

router.use(autenticar, autorizar('admin'));
router.get('/', prestamoController.listar);
router.post('/', prestamoValidator, validar, prestamoController.crear);
router.patch('/:id/devolver', prestamoController.devolver);

module.exports = router;
