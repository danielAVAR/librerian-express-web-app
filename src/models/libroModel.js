const pool = require('../config/db');

const listar = async (busqueda = '') => {
  const like = `%${busqueda}%`;
  const [filas] = await pool.query(
    'SELECT * FROM libros WHERE titulo LIKE ? OR autor LIKE ? OR isbn LIKE ? ORDER BY titulo',
    [like, like, like]
  );
  return filas;
};

const buscarPorId = async (id, db = pool) => {
  const [filas] = await db.query('SELECT * FROM libros WHERE id = ?', [id]);
  return filas[0];
};

const crear = async (datos) => {
  const [resultado] = await pool.query(
    'INSERT INTO libros (titulo, autor, isbn, editorial, anio, precio, stock) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [datos.titulo, datos.autor, datos.isbn || null, datos.editorial || null, datos.anio || null, datos.precio, datos.stock]
  );
  return resultado.insertId;
};

const actualizar = async (id, datos) => {
  await pool.query(
    'UPDATE libros SET titulo = ?, autor = ?, isbn = ?, editorial = ?, anio = ?, precio = ?, stock = ? WHERE id = ?',
    [datos.titulo, datos.autor, datos.isbn || null, datos.editorial || null, datos.anio || null, datos.precio, datos.stock, id]
  );
};

const eliminar = async (id) => {
  await pool.query('DELETE FROM libros WHERE id = ?', [id]);
};

const ajustarStock = async (id, cantidad, db = pool) => {
  await db.query('UPDATE libros SET stock = stock + ? WHERE id = ?', [cantidad, id]);
};

module.exports = { listar, buscarPorId, crear, actualizar, eliminar, ajustarStock };
