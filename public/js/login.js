const formulario = document.getElementById('formLogin');
const mensaje = document.getElementById('mensaje');

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  try {
    const datos = await api('/auth/login', {
      method: 'POST',
      body: {
        email: formulario.email.value,
        password: formulario.password.value
      }
    });

    guardarSesion(datos);
    window.location.href = datos.usuario.rol === 'admin' ? '/admin.html' : '/usuario.html';
  } catch (error) {
    mostrarMensaje(mensaje, error.message);
  }
});
