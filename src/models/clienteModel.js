const pool = require('../config/db');

const listar = async () => {
  const [filas] = await pool.query('SELECT * FROM clientes ORDER BY nombre');
  return filas;
};

const buscarPorId = async (id, db = pool) => {
  const [filas] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
  return filas[0];
};

const buscarPorUsuarioId = async (usuarioId, db = pool) => {
  const [filas] = await db.query('SELECT * FROM clientes WHERE usuario_id = ?', [usuarioId]);
  return filas[0];
};

const crear = async (datos, db = pool) => {
  const [resultado] = await db.query(
    'INSERT INTO clientes (usuario_id, identificacion, nombre, telefono, direccion, email) VALUES (?, ?, ?, ?, ?, ?)',
    [
      datos.usuario_id || null,
      datos.identificacion,
      datos.nombre,
      datos.telefono || null,
      datos.direccion || null,
      datos.email || null
    ]
  );
  return resultado.insertId;
};

const actualizar = async (id, datos, db = pool) => {
  await db.query(
    'UPDATE clientes SET nombre = ?, telefono = ?, direccion = ?, email = ? WHERE id = ?',
    [datos.nombre, datos.telefono || null, datos.direccion || null, datos.email || null, id]
  );
};

module.exports = { listar, buscarPorId, buscarPorUsuarioId, crear, actualizar };
