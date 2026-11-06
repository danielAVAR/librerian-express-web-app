const usuarioDto = (usuario, cliente) => {
  const datos = cliente || {};

  return {
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
    identificacion: datos.identificacion || null,
    telefono: datos.telefono || null,
    direccion: datos.direccion || null
  };
};

module.exports = usuarioDto;
