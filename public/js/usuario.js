const sesion = exigirSesion('usuario');

const formPerfil = document.getElementById('formPerfil');
const mensajePerfil = document.getElementById('mensajePerfil');

document.getElementById('bienvenida').textContent = `Hola, ${sesion.usuario.nombre}`;
document.getElementById('btnSalir').addEventListener('click', cerrarSesion);

const cargarPerfil = async () => {
  const perfil = await api('/usuario/perfil');
  formPerfil.nombre.value = perfil.nombre;
  formPerfil.email.value = perfil.email;
  formPerfil.identificacion.value = perfil.identificacion || '';
  formPerfil.telefono.value = perfil.telefono || '';
  formPerfil.direccion.value = perfil.direccion || '';
};

formPerfil.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  try {
    await api('/usuario/perfil', {
      method: 'PUT',
      body: {
        nombre: formPerfil.nombre.value,
        email: formPerfil.email.value,
        telefono: formPerfil.telefono.value,
        direccion: formPerfil.direccion.value,
        password: formPerfil.password.value
      }
    });

    formPerfil.password.value = '';
    document.getElementById('bienvenida').textContent = `Hola, ${formPerfil.nombre.value}`;
    mostrarMensaje(mensajePerfil, 'Perfil actualizado', 'exito');
  } catch (error) {
    mostrarMensaje(mensajePerfil, error.message);
  }
});

const cargarPrestamos = async () => {
  const prestamos = await api('/usuario/prestamos');

  document.getElementById('tablaPrestamos').innerHTML = prestamos.map((prestamo) => `
    <tr>
      <td>${escapar(prestamo.libro)}</td>
      <td>${escapar(prestamo.fecha_prestamo)}</td>
      <td>${escapar(prestamo.fecha_devolucion_tentativa)}</td>
      <td>${escapar(prestamo.fecha_devolucion || '-')}</td>
      <td>${escapar(prestamo.estado)}</td>
    </tr>`).join('') || '<tr><td colspan="5">Sin préstamos</td></tr>';
};

const cargarCompras = async () => {
  const compras = await api('/usuario/compras');

  document.getElementById('listaCompras').innerHTML = compras.map((venta) => `
    <div class="caja-venta">
      <strong>Compra #${escapar(venta.id)} | ${escapar(venta.fecha)} | Total: $${escapar(venta.total)}</strong>
      <ul>${venta.libros.map((libro) => `<li>${escapar(libro.titulo)} x${escapar(libro.cantidad)} ($${escapar(libro.precio_unitario)})</li>`).join('')}</ul>
    </div>`).join('') || '<p>Sin compras registradas</p>';
};

cargarPerfil();
cargarPrestamos();
cargarCompras();
