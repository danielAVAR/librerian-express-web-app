const ventaDto = (venta, detalles) => ({
  id: venta.id,
  fecha: venta.fecha,
  cliente: venta.cliente,
  registrado_por: venta.registrado_por,
  total: venta.total,
  libros: detalles.map((detalle) => ({
    libro_id: detalle.libro_id,
    titulo: detalle.titulo,
    cantidad: detalle.cantidad,
    precio_unitario: detalle.precio_unitario,
    subtotal: detalle.precio_unitario * detalle.cantidad
  }))
});

module.exports = ventaDto;
