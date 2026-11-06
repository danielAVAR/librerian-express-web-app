require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const crearAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const [existentes] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);

  if (existentes.length > 0) {
    console.log('El administrador ya existe');
  } else {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await pool.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
      [process.env.ADMIN_NOMBRE, email, hash, 'admin']
    );
    console.log('Administrador creado');
  }

  await pool.end();
};

crearAdmin();
