const express = require('express');
const authRoutes = require('./authRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const libroRoutes = require('./libroRoutes');
const prestamoRoutes = require('./prestamoRoutes');
const ventaRoutes = require('./ventaRoutes');
const clienteRoutes = require('./clienteRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/usuario', usuarioRoutes);
router.use('/libros', libroRoutes);
router.use('/prestamos', prestamoRoutes);
router.use('/ventas', ventaRoutes);
router.use('/clientes', clienteRoutes);

module.exports = router;
