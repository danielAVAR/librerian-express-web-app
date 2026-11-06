const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const autenticar = require('../middlewares/authMiddleware');
const autorizar = require('../middlewares/roleMiddleware');
const validar = require('../middlewares/validarMiddleware');
const { perfilValidator } = require('../validators/usuarioValidator');

const router = express.Router();

router.use(autenticar);
router.get('/perfil', usuarioController.obtenerPerfil);
router.put('/perfil', perfilValidator, validar, usuarioController.actualizarPerfil);
router.get('/prestamos', usuarioController.historialPrestamos);
router.get('/compras', usuarioController.historialCompras);
router.get('/todos', autorizar('admin'), usuarioController.listarTodos);

module.exports = router;
