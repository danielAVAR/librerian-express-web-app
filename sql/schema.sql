CREATE DATABASE IF NOT EXISTS biblioteca;
USE biblioteca;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol ENUM('admin', 'usuario') NOT NULL DEFAULT 'usuario',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NULL UNIQUE,
  identificacion VARCHAR(30) NOT NULL UNIQUE,
  nombre VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  direccion VARCHAR(200),
  email VARCHAR(120),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS libros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  autor VARCHAR(150) NOT NULL,
  isbn VARCHAR(20) UNIQUE,
  editorial VARCHAR(120),
  anio INT,
  precio DECIMAL(10, 2) NOT NULL DEFAULT 0,
  stock INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS prestamos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  libro_id INT NOT NULL,
  usuario_id INT NOT NULL,
  fecha_prestamo DATE NOT NULL,
  fecha_devolucion_tentativa DATE NOT NULL,
  fecha_devolucion DATE NULL,
  estado ENUM('activo', 'devuelto') NOT NULL DEFAULT 'activo',
  FOREIGN KEY (libro_id) REFERENCES libros(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  usuario_id INT NOT NULL,
  fecha DATE NOT NULL,
  total DECIMAL(10, 2) NOT NULL DEFAULT 0,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS venta_detalles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT NOT NULL,
  libro_id INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (venta_id) REFERENCES ventas(id) ON DELETE CASCADE,
  FOREIGN KEY (libro_id) REFERENCES libros(id)
);
