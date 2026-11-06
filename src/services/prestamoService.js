const libroModel = require('../models/libroModel');
const prestamoModel = require('../models/prestamoModel');
const AppError = require('../utils/AppError');
const ejecutarEnTransaccion = require('../utils/transaccion');

const listarTodos = () => {
  return prestamoModel.listarTodos();
};

const prestar = async (datos) => {
  const prestamoId = await ejecutarEnTransaccion(async (conn) => {
    const libro = await libroModel.buscarPorId(datos.libro_id, conn);
    if (!libro) {
      throw new AppError('El libro no existe', 404);
    }
    if (libro.stock < 1) {
      throw new AppError('No hay ejemplares disponibles', 400);
    }

    await libroModel.ajustarStock(libro.id, -1, conn);
    return prestamoModel.crear(datos, conn);
  });

  return prestamoModel.buscarPorId(prestamoId);
};

const devolver = async (id) => {
  await ejecutarEnTransaccion(async (conn) => {
    const prestamo = await prestamoModel.buscarPorId(id, conn);
    if (!prestamo) {
      throw new AppError('Préstamo no encontrado', 404);
    }
    if (prestamo.estado === 'devuelto') {
      throw new AppError('Este préstamo ya fue devuelto', 400);
    }

    await prestamoModel.marcarDevuelto(id, conn);
    await libroModel.ajustarStock(prestamo.libro_id, 1, conn);
  });

  return prestamoModel.buscarPorId(id);
};

module.exports = { listarTodos, prestar, devolver };
