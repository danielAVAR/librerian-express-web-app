const pool = require('../config/db');

const listar = async () => {
  const [filas] = await pool.query('SELECT id, nombre, email, rol FROM usuarios ORDER BY nombre');
  return filas;
};

const buscarPorId = async (id, db = pool) => {
  const [filas] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return filas[0];
};

const buscarPorEmail = async (email) => {
  const [filas] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
  return filas[0];
};

const crear = async (datos, db = pool) => {
  const [resultado] = await db.query(
    'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
    [datos.nombre, datos.email, datos.password, 'usuario']
  );
  return resultado.insertId;
};

const actualizar = async (id, datos) => {
  await pool.query(
    'UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?',
    [datos.nombre, datos.email, datos.password, id]
  );
};

module.exports = { listar, buscarPorId, buscarPorEmail, crear, actualizar };
