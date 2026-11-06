const pool = require('../config/db');

const SELECT_BASE = `
  SELECT v.*, c.nombre AS cliente, u.nombre AS registrado_por
  FROM ventas v
  JOIN clientes c ON c.id = v.cliente_id
  JOIN usuarios u ON u.id = v.usuario_id`;

const crear = async (datos, db = pool) => {
  const [resultado] = await db.query(
    'INSERT INTO ventas (cliente_id, usuario_id, fecha, total) VALUES (?, ?, COALESCE(?, CURDATE()), ?)',
    [datos.cliente_id, datos.usuario_id, datos.fecha || null, datos.total]
  );
  return resultado.insertId;
};

const crearDetalle = async (datos, db = pool) => {
  await db.query(
    'INSERT INTO venta_detalles (venta_id, libro_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
    [datos.venta_id, datos.libro_id, datos.cantidad, datos.precio_unitario]
  );
};

const buscarPorId = async (id) => {
  const [filas] = await pool.query(`${SELECT_BASE} WHERE v.id = ?`, [id]);
  return filas[0];
};

const listarTodas = async () => {
  const [filas] = await pool.query(`${SELECT_BASE} ORDER BY v.id DESC`);
  return filas;
};

const listarPorCliente = async (clienteId) => {
  const [filas] = await pool.query(`${SELECT_BASE} WHERE v.cliente_id = ? ORDER BY v.id DESC`, [clienteId]);
  return filas;
};

const detallesDeVenta = async (ventaId) => {
  const [filas] = await pool.query(
    `SELECT d.libro_id, l.titulo, d.cantidad, d.precio_unitario
     FROM venta_detalles d
     JOIN libros l ON l.id = d.libro_id
     WHERE d.venta_id = ?`,
    [ventaId]
  );
  return filas;
};

module.exports = { crear, crearDetalle, buscarPorId, listarTodas, listarPorCliente, detallesDeVenta };
