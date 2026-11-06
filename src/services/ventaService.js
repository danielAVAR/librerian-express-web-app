const ventaModel = require('../models/ventaModel');
const clienteModel = require('../models/clienteModel');
const libroModel = require('../models/libroModel');
const AppError = require('../utils/AppError');
const ejecutarEnTransaccion = require('../utils/transaccion');
const ventaDto = require('../dtos/ventaDto');

const armarVentas = async (ventas) => {
  const lista = [];
  for (const venta of ventas) {
    const detalles = await ventaModel.detallesDeVenta(venta.id);
    lista.push(ventaDto(venta, detalles));
  }
  return lista;
};

const obtener = async (id) => {
  const venta = await ventaModel.buscarPorId(id);
  if (!venta) {
    throw new AppError('Venta no encontrada', 404);
  }
  const [armada] = await armarVentas([venta]);
  return armada;
};

const listarTodas = async () => {
  const ventas = await ventaModel.listarTodas();
  return armarVentas(ventas);
};

const listarPorCliente = async (clienteId) => {
  const ventas = await ventaModel.listarPorCliente(clienteId);
  return armarVentas(ventas);
};

const registrar = async (datos, usuarioId) => {
  const ventaId = await ejecutarEnTransaccion(async (conn) => {
    const cliente = await clienteModel.buscarPorId(datos.cliente_id, conn);
    if (!cliente) {
      throw new AppError('El cliente no existe', 404);
    }

    let total = 0;
    const detalles = [];

    for (const item of datos.libros) {
      const libro = await libroModel.buscarPorId(item.libro_id, conn);
      if (!libro) {
        throw new AppError('Uno de los libros no existe', 404);
      }
      if (libro.stock < item.cantidad) {
        throw new AppError(`Stock insuficiente de "${libro.titulo}"`, 400);
      }

      await libroModel.ajustarStock(libro.id, -item.cantidad, conn);
      total += libro.precio * item.cantidad;
      detalles.push({
        libro_id: libro.id,
        cantidad: item.cantidad,
        precio_unitario: libro.precio
      });
    }

    const id = await ventaModel.crear({
      cliente_id: cliente.id,
      usuario_id: usuarioId,
      fecha: datos.fecha,
      total
    }, conn);

    for (const detalle of detalles) {
      await ventaModel.crearDetalle({ ...detalle, venta_id: id }, conn);
    }

    return id;
  });

  return obtener(ventaId);
};

module.exports = { listarTodas, listarPorCliente, registrar };
