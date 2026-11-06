const express = require('express');
const libroController = require('../controllers/libroController');
const autenticar = require('../middlewares/authMiddleware');
const autorizar = require('../middlewares/roleMiddleware');
const validar = require('../middlewares/validarMiddleware');
const { libroValidator } = require('../validators/libroValidator');

const router = express.Router();

router.use(autenticar);
router.get('/', libroController.listar);
router.get('/:id', libroController.obtener);
router.post('/', autorizar('admin'), libroValidator, validar, libroController.crear);
router.put('/:id', autorizar('admin'), libroValidator, validar, libroController.actualizar);
router.delete('/:id', autorizar('admin'), libroController.eliminar);

module.exports = router;
