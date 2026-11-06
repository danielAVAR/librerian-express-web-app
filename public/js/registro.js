const formulario = document.getElementById('formRegistro');
const mensaje = document.getElementById('mensaje');

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  try {
    const datos = await api('/auth/registro', {
      method: 'POST',
      body: {
        nombre: formulario.nombre.value,
        identificacion: formulario.identificacion.value,
        email: formulario.email.value,
        telefono: formulario.telefono.value,
        direccion: formulario.direccion.value,
        password: formulario.password.value
      }
    });

    guardarSesion(datos);
    window.location.href = '/usuario.html';
  } catch (error) {
    mostrarMensaje(mensaje, error.message);
  }
});
