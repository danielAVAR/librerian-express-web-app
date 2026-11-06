const pool = require('../config/db');

const SELECT_BASE = `
  SELECT p.*, l.titulo AS libro, u.nombre AS usuario
  FROM prestamos p
  JOIN libros l ON l.id = p.libro_id
  JOIN usuarios u ON u.id = p.usuario_id`;

const crear = async (datos, db = pool) => {
  const [resultado] = await db.query(
    `INSERT INTO prestamos (libro_id, usuario_id, fecha_prestamo, fecha_devolucion_tentativa)
     VALUES (?, ?, COALESCE(?, CURDATE()), ?)`,
    [datos.libro_id, datos.usuario_id, datos.fecha_prestamo || null, datos.fecha_devolucion_tentativa]
  );
  return resultado.insertId;
};

const listarTodos = async () => {
  const [filas] = await pool.query(`${SELECT_BASE} ORDER BY p.id DESC`);
  return filas;
};

const listarPorUsuario = async (usuarioId) => {
  const [filas] = await pool.query(`${SELECT_BASE} WHERE p.usuario_id = ? ORDER BY p.id DESC`, [usuarioId]);
  return filas;
};

const buscarPorId = async (id, db = pool) => {
  const [filas] = await db.query(`${SELECT_BASE} WHERE p.id = ?`, [id]);
  return filas[0];
};

const marcarDevuelto = async (id, db = pool) => {
  await db.query(
    "UPDATE prestamos SET estado = 'devuelto', fecha_devolucion = CURDATE() WHERE id = ?",
    [id]
  );
};

module.exports = { crear, listarTodos, listarPorUsuario, buscarPorId, marcarDevuelto };
